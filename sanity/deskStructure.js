import S from "@sanity/desk-tool/structure-builder";
import { FaBeer } from "react-icons/fa";

export default () =>
  S.list()
    .title("Contents")
    .items([
      S.listItem()
        .title("Settings")
        .icon(FaBeer)
        .child(
          S.document().schemaType("siteSettings").documentId("siteSettings")
        ),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (listItem) => !["siteSettings"].includes(listItem.getId())
      ),
    ]);
