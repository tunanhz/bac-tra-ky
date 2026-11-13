"""
Tạo font tự host đã subset cho Bác Trà Ký (Playfair Display + Caudex, giấy phép SIL OFL 1.1 — xem OFL-*.txt).

Vì sao: Google Fonts chia mỗi kiểu chữ thành 3 file (latin, latin-ext, vietnamese) và trang tiếng Việt tải cả 3
(~70 KB/kiểu, ~300 KB cho 5 kiểu đang dùng) — giành băng thông với ảnh hero, kéo LCP mobile lên ~5 s. Subset đúng bộ
ký tự tiếng Việt + dấu câu, gộp 1 file/kiểu, Playfair giới hạn trục wght 400–700 → ~100 KB tổng.

Chạy lại khi cần thêm ký tự (cần Python có `fonttools` và `brotli`, KHÔNG phải dependency của dự án):

    python -m venv .fvenv && .fvenv/Scripts/python -m pip install fonttools brotli
    .fvenv/Scripts/python src/app/fonts/subset_fonts.py <thư-mục-chứa-ttf-gốc>

TTF gốc: https://github.com/google/fonts/tree/main/ofl/playfairdisplay và .../ofl/caudex

Giấy phép: cả hai font có "Reserved Font Name" ("Playfair Display", "Caudex"). Subset là tạo bản sửa đổi (Modified
Version) nên theo OFL bản sửa đổi KHÔNG được mang tên dành riêng — script đổi tên họ font trong bảng `name` thành
"BTK Heading" / "BTK Body", giữ nguyên dòng copyright (nameID 0) và giấy phép (nameID 13, 14). CSS không phụ thuộc
tên này (next/font tự đặt tên họ).
"""

import sys
from pathlib import Path

from fontTools import subset
from fontTools.pens.recordingPen import RecordingPen
from fontTools.pens.ttGlyphPen import TTGlyphPen
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer

OUT = Path(__file__).resolve().parent

RANGES = [
    (0x0020, 0x007E),  # Basic Latin
    (0x00A0, 0x00FF),  # Latin-1 (à á â ã è é ê ì í ò ó ô õ ù ú ý, ·, «», ×)
    (0x0102, 0x0103), (0x0110, 0x0111), (0x0128, 0x0129), (0x0168, 0x0169),  # Ă Đ Ĩ Ũ
    (0x01A0, 0x01A1), (0x01AF, 0x01B0),  # Ơ Ư
    (0x0300, 0x0301), (0x0303, 0x0303), (0x0309, 0x0309), (0x0323, 0x0323),  # dấu tổ hợp (chữ gõ dạng NFD)
    (0x1EA0, 0x1EF9),  # chữ Việt có dấu
    (0x2013, 0x2014), (0x2018, 0x201A), (0x201C, 0x201E), (0x2022, 0x2022), (0x2026, 0x2026),  # – — ‘ ’ “ ” • …
    (0x2032, 0x2033), (0x2039, 0x203A), (0x20AB, 0x20AB), (0x2190, 0x2193), (0x2212, 0x2212),  # ′ ″ ‹ › ₫ ← → −
]
UNICODES = [cp for start, end in RANGES for cp in range(start, end + 1)]

# Caudex thiếu 20 chữ ơ/ư mang dấu thanh (cả bản trên Google Fonts) nên trình duyệt vẽ chúng bằng font dự phòng, lẫn
# giữa từ ("người", "những"). Ghép lại: thân ơ/ư/Ơ/Ư + nét dấu tách từ chữ o/u/O/U mang cùng dấu (ó, ò, ỏ, õ, ọ…).
# (mã cần tạo, glyph thân có móc, chữ cùng dấu không móc, chữ gốc không dấu)
HORN_COMPOSITES = [
    (0x1EDB, "ơ", "ó", "o"), (0x1EDD, "ơ", "ò", "o"), (0x1EDF, "ơ", "ỏ", "o"), (0x1EE1, "ơ", "õ", "o"), (0x1EE3, "ơ", "ọ", "o"),
    (0x1EDA, "Ơ", "Ó", "O"), (0x1EDC, "Ơ", "Ò", "O"), (0x1EDE, "Ơ", "Ỏ", "O"), (0x1EE0, "Ơ", "Õ", "O"), (0x1EE2, "Ơ", "Ọ", "O"),
    (0x1EE9, "ư", "ú", "u"), (0x1EEB, "ư", "ù", "u"), (0x1EED, "ư", "ủ", "u"), (0x1EEF, "ư", "ũ", "u"), (0x1EF1, "ư", "ụ", "u"),
    (0x1EE8, "Ư", "Ú", "U"), (0x1EEA, "Ư", "Ù", "U"), (0x1EEC, "Ư", "Ủ", "U"), (0x1EEE, "Ư", "Ũ", "U"), (0x1EF0, "Ư", "Ụ", "U"),
]


def contours(font: TTFont, glyph_name: str) -> list[list[tuple]]:
    pen = RecordingPen()
    font.getGlyphSet()[glyph_name].draw(pen)
    result: list[list[tuple]] = []
    for operator, operands in pen.value:
        if operator == "moveTo":
            result.append([])
        result[-1].append((operator, operands))
    return result


def add_horn_composites(font: TTFont) -> int:
    """Tạo glyph còn thiếu trong HORN_COMPOSITES (chỉ font TrueType, không biến thiên). Trả về số glyph đã thêm."""
    cmap = font.getBestCmap()
    glyf, hmtx = font["glyf"], font["hmtx"]
    added = 0
    for codepoint, horn_char, accented_char, base_char in HORN_COMPOSITES:
        if codepoint in cmap:
            continue
        horn, accented, base = (cmap[ord(c)] for c in (horn_char, accented_char, base_char))
        base_contours = contours(font, base)
        mark = [c for c in contours(font, accented) if c not in base_contours]
        if not mark:
            raise SystemExit(f"Không tách được dấu của {accented_char!r}")
        pen = TTGlyphPen(font.getGlyphSet())
        font.getGlyphSet()[horn].draw(pen)
        for contour in mark:
            for operator, operands in contour:
                getattr(pen, operator)(*operands)
        name = f"uni{codepoint:04X}"
        glyph = pen.glyph()
        glyph.recalcBounds(glyf)
        glyf[name] = glyph  # tự thêm tên vào glyph order dùng chung của font
        hmtx[name] = (hmtx[horn][0], getattr(glyph, "xMin", 0))
        for table in font["cmap"].tables:
            if table.isUnicode():
                table.cmap[codepoint] = name
        added += 1
    font["maxp"].numGlyphs = len(font.getGlyphOrder())
    return added


FONTS = [
    # (file gốc, file ra, tên họ mới, kiểu, giới hạn trục wght cho font biến thiên)
    ("PlayfairDisplay[wght].ttf", "playfair-display.woff2", "BTK Heading", "Regular", (400, 700)),
    ("PlayfairDisplay-Italic[wght].ttf", "playfair-display-italic.woff2", "BTK Heading", "Italic", (400, 700)),
    ("Caudex-Regular.ttf", "caudex-regular.woff2", "BTK Body", "Regular", None),
    ("Caudex-Bold.ttf", "caudex-bold.woff2", "BTK Body", "Bold", None),
    ("Caudex-Italic.ttf", "caudex-italic.woff2", "BTK Body", "Italic", None),
    ("Caudex-BoldItalic.ttf", "caudex-bold-italic.woff2", "BTK Body", "Bold Italic", None),
]

RESERVED_NAMES = ("Playfair Display", "PlayfairDisplay", "Caudex")


def rename(font: TTFont, family: str, style: str) -> None:
    """Đổi tên họ font (OFL: bản sửa đổi không được dùng Reserved Font Name). Giữ copyright/giấy phép."""
    names = font["name"]
    values = {
        1: family,
        2: style,
        3: f"{family};{style}",
        4: f"{family} {style}",
        6: f"{family}-{style}".replace(" ", ""),
        16: family,
        17: style,
        21: family,
        22: style,
        25: family.replace(" ", ""),
    }
    for record in list(names.names):
        if record.nameID in values:
            record.string = values[record.nameID]
    for record in names.names:
        if record.nameID in (0, 13, 14):
            continue
        text = record.toUnicode()
        # Tên instance của font biến thiên (nameID > 255, vd. "PlayfairDisplayRoman-Regular").
        for reserved in RESERVED_NAMES:
            replacement = family if " " in reserved else family.replace(" ", "")
            text = text.replace(reserved, replacement)
        record.string = text
        if any(reserved in text for reserved in RESERVED_NAMES):
            raise SystemExit(f"Còn tên dành riêng ở nameID {record.nameID}: {text!r}")


def find_source(src_dir: Path, name: str) -> Path:
    matches = [p for p in src_dir.iterdir() if p.name.endswith(name)]
    if not matches:
        raise SystemExit(f"Không thấy {name} trong {src_dir}")
    return matches[0]


def main() -> None:
    if len(sys.argv) != 2:
        raise SystemExit(__doc__)
    src_dir = Path(sys.argv[1])
    for source_name, out_name, family, style, wght in FONTS:
        font = TTFont(find_source(src_dir, source_name), lazy=False)
        if not wght:
            added = add_horn_composites(font)
            if added:
                print(f"{source_name}: ghép thêm {added} chữ ơ/ư có dấu")
        options = subset.Options()
        options.flavor = "woff2"
        # Bộ feature mặc định của fontTools: đã gồm ccmp, mark, mkmk (dấu tiếng Việt), kern, liga, locl…
        options.name_IDs = ["*"]
        options.notdef_outline = True
        options.drop_tables += ["DSIG"]
        subsetter = subset.Subsetter(options)
        subsetter.populate(unicodes=UNICODES)
        subsetter.subset(font)
        if wght:
            # Subset trước rồi mới giới hạn trục (instancer trên font đầy đủ lỗi bảng gvar nạp lười).
            font = instancer.instantiateVariableFont(font, {"wght": wght})
        rename(font, family, style)
        out = OUT / out_name
        font.flavor = "woff2"
        font.save(out)
        print(f"{out_name}: {out.stat().st_size // 1024} KB")


if __name__ == "__main__":
    main()
