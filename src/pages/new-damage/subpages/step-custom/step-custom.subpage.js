import React, { useState, useContext } from "react";

import { FancyHeader, ImagePreviewComponent } from "../../../../components";
import { StepCustomWrapper, SectionWrapper, ImagePreviewWrapper } from "./step-custom.styled";
import { Input, Checkbox, Radio, Select, Button, message } from "antd";
import { useHistory } from "react-router-dom";
import { AppContext } from "../../../../context/app.context";

export default function StepCustom() {
  const { customStepTemplate, setCustomStepTemplate } = useContext(AppContext);
  const history = useHistory();
  const [template, setTemplate] = useState(customStepTemplate ? customStepTemplate.forms : null);

  if (!customStepTemplate) {
    history.goBack();
    message.error("Error: No customStepTemplate");
    return <div>Error</div>;
  }

  const renderText = (form, index) => {
    return (
      <SectionWrapper className="SectionWrapper">
        <h3>{form.label}</h3>
        <Input
          onChange={(e) => {
            const futureTemplate = template;
            futureTemplate[index].value = e.currentTarget.value;

            setTemplate([...futureTemplate]);
          }}
          placeholder={form.placeholder}
        />
      </SectionWrapper>
    );
  };

  const renderTextArea = (form, index) => {
    return (
      <SectionWrapper className="SectionWrapper">
        <h3>{form.label}</h3>
        <Input.TextArea
          onChange={(e) => {
            const futureTemplate = template;
            futureTemplate[index].value = e.currentTarget.value;

            setTemplate([...futureTemplate]);
          }}
          placeholder={form.placeholder}
        />
      </SectionWrapper>
    );
  };

  const renderCheck = (form, index) => {
    return (
      <SectionWrapper className="SectionWrapper">
        <h3>{form.label}</h3>

        {form.value.map((checkbox, checkboxIndex) => (
          <Checkbox
            key={checkbox.label}
            checked={checkbox.checked}
            onChange={(e) => {
              const futureTemplate = template;
              futureTemplate[index].value[checkboxIndex].checked = !checkbox.checked;
              setTemplate([...futureTemplate]);
            }}
          >
            {checkbox.label}
          </Checkbox>
        ))}
      </SectionWrapper>
    );
  };

  const changeRadioValue = (value, formIndex) => {
    const futureTemplate = template;

    // Set all false
    futureTemplate[formIndex].value.map((radio, index) => {
      if (radio.label === value) {
        futureTemplate[formIndex].value[index].checked = true;
      } else {
        futureTemplate[formIndex].value[index].checked = false;
      }
    });

    setTemplate([...futureTemplate]);
  };

  const renderRadio = (form, index) => {
    return (
      <SectionWrapper className="SectionWrapper">
        <h3>{form.label}</h3>
        {form.value.map((radio, radioIndex) => (
          <Radio checked={radio.checked} key={radio.label} onChange={(e) => changeRadioValue(e.target.value, index)} value={radio.label}>
            {radio.label}
          </Radio>
        ))}
      </SectionWrapper>
    );
  };

  const changeSelectValue = (value, formIndex) => {
    const futureTemplate = template;

    // Set all false
    futureTemplate[formIndex].value.map((option, index) => {
      if (option.value === value) {
        futureTemplate[formIndex].value[index].selected = true;
      } else {
        futureTemplate[formIndex].value[index].selected = false;
      }
    });

    setTemplate([...futureTemplate]);
  };

  const renderSelect = (form, index) => {
    const defaultValue = form.value.filter((e) => e.selected)[0];

    return (
      <SectionWrapper className="SectionWrapper">
        <h3>{form.label}</h3>

        <Select
          placeholder={form.label}
          allowClear
          defaultValue={defaultValue && defaultValue.value}
          showSearch
          onChange={(e) => changeSelectValue(e, index)}
          filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        >
          {form.value.map((option) => (
            <Select.Option key={option.value} value={option.value}>
              {option.name}
            </Select.Option>
          ))}
        </Select>
      </SectionWrapper>
    );
  };

  const renderImage = (form, index) => {
    return (
      <SectionWrapper className="SectionWrapper">
        <h3>{form.label}</h3>

        {form.value.map((photo, photoIndex) => (
          <ImagePreviewWrapper key={photo.name} className="ImagePreviewWrapper">
            <ImagePreviewComponent
              overflowPhoto={photo.overlay}
              title={photo.name}
              withPreview={false}
              setPhotoURI={(photoURI) => {
                const futureTemplate = template;
                futureTemplate[index].value[photoIndex].photo = photoURI;
                setTemplate([...futureTemplate]);
              }}
              photoURI={photo.photo}
            />
          </ImagePreviewWrapper>
        ))}
      </SectionWrapper>
    );
  };

  return (
    <StepCustomWrapper>
      <FancyHeader title={customStepTemplate.template} subtitle={"Aici orice altceva"} />

      {template.map((form, index) => {
        if (form.type === "text") {
          return renderText(form, index);
        }

        if (form.type === "textarea") {
          return renderTextArea(form, index);
        }
        if (form.type === "check") {
          return renderCheck(form, index);
        }
        if (form.type === "radio") {
          return renderRadio(form, index);
        }
        if (form.type === "select") {
          return renderSelect(form, index);
        }
        if (form.type === "image") {
          return renderImage(form, index);
        }
      })}

      <Button
        onClick={() => {
          setCustomStepTemplate(template);
          history.push("/step-summary");
        }}
      >
        Urmatorul pas
      </Button>
    </StepCustomWrapper>
  );
}
