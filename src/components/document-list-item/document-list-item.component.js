import React from "react";
import { Badge } from "antd";
import { DocumentListItemWrapper, UnsignedDocumentWrapper, SignedDocumentWrapper } from "./document-list-item.styled";
import { useHistory } from "react-router-dom";

export default function DocumentListItem({ document }) {
  let history = useHistory();

  const renderSignedDocument = () => (
    <SignedDocumentWrapper
      onClick={() =>
        history.push({
          pathname: "/document",
          state: { document: document },
        })
      }
      className="SignedDocumentWrapper"
    >
      <DocumentListItemWrapper className="DocumentListItemWrapper">
        <span className="document-name">{document.name}</span>

        <span className="signature">Semnat</span>
      </DocumentListItemWrapper>
    </SignedDocumentWrapper>
  );

  const renderUnsignedDocument = () => (
    <UnsignedDocumentWrapper
      onClick={() =>
        history.push({
          pathname: "/document",
          state: { document: document },
        })
      }
      className="UnsignedDocumentWrapper"
    >
      <Badge dot>
        <DocumentListItemWrapper className="DocumentListItemWrapper">
          <span className="document-name">{document.name}</span>

          <span className="signature">Nesemnat</span>
        </DocumentListItemWrapper>
      </Badge>
    </UnsignedDocumentWrapper>
  );

  return document.signature ? renderSignedDocument() : renderUnsignedDocument();
}
