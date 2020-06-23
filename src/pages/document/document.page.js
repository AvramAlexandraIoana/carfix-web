import React, { useEffect, useState, useRef, useContext } from "react";

import { useLocation, useHistory } from "react-router-dom";
import { Spin, Button, Input, message } from "antd";
import PDFViewer from "pdf-viewer-reactjs";
import SignatureCanvas from "react-signature-canvas";
import axios from "axios";
import { DocumentPageWrapper, PDFWrapper, ButtonWrapper, ButtonsWrapper, SignatureWrapper, IbanInputWrapper } from "./document.styled";
import { FancyHeader } from "../../components";
import { AppContext } from "../../context/app.context";
import { API_URL } from "../../constants";

export default function DocumentPage() {
  const location = useLocation();
  const [document, setDocument] = useState(null);
  const [signaturePadVisible, setSignaturePadVisible] = useState(false);
  const signatureRef = useRef(null);
  const [startedSigning, setStartedSigning] = useState(false);
  const [iban, setIban] = useState("");
  const [valideIban, setValideIban] = useState(false);
  const { setIsLoading, isLoading, user, currentDetailTask } = useContext(AppContext);

  const history = useHistory();
  useEffect(() => {
    if (location.state && location.state.document) {
      setDocument(location.state.document);
      localStorage["lastDocument"] = JSON.stringify(location.state.document);
    } else {
      setDocument(JSON.parse(localStorage["lastDocument"]));
    }
  }, []);

  useEffect(() => {
    const regex = /RO[a-zA-Z0-9]{2}\s?([a-zA-Z]{4}\s?){1}([a-zA-Z0-9]{4}\s?){4}\s?/;
    const valide = regex.test(iban);

    if (valide && iban.replace(/ /g, "").length === 24) {
      setValideIban(true);
    } else {
      setValideIban(false);
    }
  }, [iban]);

  if (!document) {
    return (
      <div
        style={{
          height: "calc(100vh - 64px)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  const signDocument = () => {
    const signatureBase64 = signatureRef.current.toDataURL();

    setIsLoading(true);
    const bodyFormData = new FormData();
    bodyFormData.set("file", `${document.filename}.${document.extension}`);
    bodyFormData.set("iban", iban);
    bodyFormData.set("signature", signatureBase64);
    bodyFormData.set("task_id", currentDetailTask.task_id);

    axios({
      method: "post",
      url: `${API_URL}/task/signdocument`,
      data: bodyFormData,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${user.jwt}`,
      },
    })
      .then(function (response) {
        //handle success
        history.goBack();
        setIsLoading(false);
      })
      .catch(function (response) {
        //handle error
        try {
          message.error(response.response.data.message);
        } catch (e) {
          console.log("Repsonse 1252:", response);
        }
        setIsLoading(false);
      });
  };

  const renderSignaturePad = () => (
    <DocumentPageWrapper>
      <SignatureWrapper>
        <FancyHeader title="Semnează documentul" subtitle={document.name} />

        <IbanInputWrapper>
          <Input
            size="large"
            placeholder="RO49 AAAA 1B31 0075 9384 0999"
            value={"RO49 AAAA 1B31 0075 9384 0999" || iban}
            onChange={(e) => setIban(e.target.value)}
          />
          {iban && !valideIban && <div className="error-message">Iban invalid</div>}
        </IbanInputWrapper>
        <SignatureCanvas
          onEnd={() => setStartedSigning(true)}
          ref={signatureRef}
          penColor="black"
          canvasProps={{ width: 300, height: 300, className: "sigCanvas" }}
        />

        <ButtonsWrapper>
          <Button
            block
            shape="round"
            onClick={() => {
              setStartedSigning(false);
              signatureRef.current.clear();
            }}
          >
            Clear
          </Button>
          <Button
            block
            shape="round"
            type="primary"
            //   disabled={!startedSigning || !valideIban}
            onClick={signDocument}
          >
            Semneaza
          </Button>
        </ButtonsWrapper>
      </SignatureWrapper>
    </DocumentPageWrapper>
  );

  if (signaturePadVisible) {
    return renderSignaturePad();
  }

  const downloadFile = () => {
    message.warn("Functie indisponibila");
  };

  return (
    <DocumentPageWrapper>
      <PDFWrapper>
        <PDFViewer
          document={{
            url: document.url,
          }}
        />
      </PDFWrapper>

      <ButtonWrapper>
        {document.signature ? (
          <Button onClick={downloadFile} type="primary" shape="round">
            Descarcă
          </Button>
        ) : (
          <Button onClick={() => setSignaturePadVisible(true)} type="primary" shape="round">
            Semnează
          </Button>
        )}
      </ButtonWrapper>
    </DocumentPageWrapper>
  );
}
