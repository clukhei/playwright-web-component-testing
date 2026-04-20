import "@govtechsg/sgds-web-component";
import { useEffect, useRef, useState } from "react";
import type { SgdsInput, SgdsCheckbox, SgdsStepper } from "@govtechsg/sgds-web-component/components";

interface FormData {
  firstName: string;
  lastName: string;
  gender: string;
}

interface StepperFormProps {
  onSubmit: (data: FormData) => void;
}

function Step1({ formData, onChange }: { formData: FormData; onChange: (data: Partial<FormData>) => void }) {
  const handleFirstNameChange = (e: CustomEvent) => {
    const sgdsInput = e.target as SgdsInput;
    onChange({ firstName: sgdsInput?.value ?? "" });
  };

  const handleLastNameChange = (e: CustomEvent) => {
    const sgdsInput = e.target as SgdsInput;
    onChange({ lastName: sgdsInput?.value ?? "" });
  };

  return (
    <div className="sgds:space-y-4">
      <div>
        <sgds-input
          label="First Name"
          name="firstName"
          value={formData.firstName}
          onsgds-input={handleFirstNameChange}
          placeholder="Enter your first name"
        />
      </div>
      <div>
        <sgds-input
          label="Last Name"
          name="lastName"
          value={formData.lastName}
          onsgds-input={handleLastNameChange}
          placeholder="Enter your last name"
        />
      </div>
    </div>
  );
}

function Step2({ formData, onChange }: { formData: FormData; onChange: (data: Partial<FormData>) => void }) {
  const handleGenderChange = (e: CustomEvent) => {
    const sgdsCheckbox = e.target as SgdsCheckbox;
    if (sgdsCheckbox?.checked) {
      onChange({ gender: sgdsCheckbox?.value ?? "" });
    }
  };

  return (
    <div>
      <fieldset>
        <legend className="sgds:text-base sgds:font-semibold sgds:mb-3">Gender</legend>
        <sgds-checkbox-group>
          <sgds-checkbox
            name="gender"
            value="female"
            checked={formData.gender === "female"}
            onsgds-change={handleGenderChange}
          >
            Female
          </sgds-checkbox>
          <sgds-checkbox
            name="gender"
            value="male"
            checked={formData.gender === "male"}
            onsgds-change={handleGenderChange}
          >
            Male
          </sgds-checkbox>
        </sgds-checkbox-group>
      </fieldset>
    </div>
  );
}

function Step3({ formData }: { formData: FormData }) {
  return (
    <div className="sgds:bg-gray-50 sgds:p-4 sgds:rounded">
      <h3 className="sgds:text-lg sgds:font-semibold sgds:mb-4">Review Your Information</h3>
      <div className="sgds:space-y-3">
        <div>
          <p className="sgds:text-sm sgds:text-gray-600">First Name</p>
          <p className="sgds:font-medium">{formData.firstName}</p>
        </div>
        <div>
          <p className="sgds:text-sm sgds:text-gray-600">Last Name</p>
          <p className="sgds:font-medium">{formData.lastName}</p>
        </div>
        <div>
          <p className="sgds:text-sm sgds:text-gray-600">Gender</p>
          <p className="sgds:font-medium sgds:capitalize">{formData.gender || "Not specified"}</p>
        </div>
      </div>
    </div>
  );
}

export function StepperForm({ onSubmit }: StepperFormProps) {
  const stepperRef = useRef<SgdsStepper>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    gender: "",
  });

  const handleChange = (data: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const steps = [
    {
      stepHeader: "Personal Details",
      component: <Step1 formData={formData} onChange={handleChange} />,
    },
    {
      stepHeader: "Gender",
      component: <Step2 formData={formData} onChange={handleChange} />,
    },
    {
      stepHeader: "Review",
      component: <Step3 formData={formData} />,
    },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      stepperRef.current?.nextStep();
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      stepperRef.current?.previousStep();
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  return (
    <div className="sgds:p-6">
      <sgds-stepper ref={stepperRef} steps={steps} />

      <div className="sgds:mt-8 sgds:min-h-48 sgds:p-4 sgds:border sgds:border-gray-200 sgds:rounded">
        {steps[currentStep].component}
      </div>

      <div className="sgds:flex sgds:gap-3 sgds:mt-8 sgds:justify-between">
        <div>
          {currentStep > 0 && (
            <sgds-button variant="secondary" onClick={handlePrevious}>
              Previous
            </sgds-button>
          )}
        </div>
        <div>
          {currentStep < steps.length - 1 && (
            <sgds-button variant="primary" onClick={handleNext}>
              Next
            </sgds-button>
          )}
          {currentStep === steps.length - 1 && (
            <sgds-button variant="primary" onClick={handleSubmit}>
              Submit
            </sgds-button>
          )}
        </div>
      </div>
    </div>
  );
}
