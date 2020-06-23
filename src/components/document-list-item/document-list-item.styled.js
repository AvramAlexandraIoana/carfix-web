import styled from "styled-components";

export const DocumentListItemWrapper = styled.div`
  padding: 16px;
  justify-content: space-between;
  display: flex;
  margin-bottom: 16px;
  border-radius: 4px;
  background: #f2f2f2;
  border: 1px solid #eee;

  .document-name {
    font-weight: 500;
    text-transform: capitalize;
    color: #101010;
  }
`;
export const UnsignedDocumentWrapper = styled.div`
  .ant-badge {
    width: 100%;
  }
`;
export const SignedDocumentWrapper = styled.div`
  .ant-badge {
    width: 100%;
  }
`;
