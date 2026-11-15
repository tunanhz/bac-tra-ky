export type PhotoCreditData = {
  author: string;
  sourceUrl: string;
  license: string;
  licenseUrl: string;
  changes: string;
};

export function PhotoCredit({ author, sourceUrl, license, licenseUrl, changes }: PhotoCreditData) {
  return (
    <>
      Ảnh: <a href={sourceUrl} className="underline underline-offset-2">{author}</a>
      {" · "}
      <a href={licenseUrl} className="underline underline-offset-2">{license}</a>
      {" · "}{changes}
    </>
  );
}
