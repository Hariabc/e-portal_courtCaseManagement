import React, { useState, useEffect } from 'react';
import PlantiffDetailsForm from '../components/PlantiffDetailsForm';
import DefendantDetailsForm from '../components/DefendantDetailsForm';
import CaseAndCourtDetailsForm from '../components/CaseandCourtDetailsForm';
import DocumentUploadForm from '../components/DocumentsUploadForm';
import PaymentDetailsForm from '../components/PaymentDetailsForm';
import PublicAttorneyRequestForm from '../dashborad-components/PublicAdvocate';
import './PartyInPerson.css'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'
import Stepper from 'react-stepper-horizontal';


const PrivateAdvocateForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [plaintiffDetails, setPlaintiffDetails] = useState({});
  const [defendantDetails, setDefendantDetails] = useState({});
  const [caseDetails, setCaseAndCourtDetails] = useState({});
  const [documents, setDocumentDetails] = useState({});
  const [paymentDetails, setPaymentDetails] = useState({});
  const [publicAttorneyRequest, setPublicAttorneyRequest] = useState({});
  const [user, setUser] = useState({});

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/client/user', { withCredentials: true });
        setUser(response.data.user); // Assuming the response includes user data
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    scrollToTop(); // Scroll to the top when the component mounts or updates
  }, [currentStep]);


 
  const handlePlaintiffChange = (data) => {
      setPlaintiffDetails(data);
      setCurrentStep(2);
  };

  

  const handleDefendantChange = (data) => {
      setDefendantDetails(data);
      setCurrentStep(3);
  };

  const handleCaseAndCourtChange = (data) => {
     // Validate plaintiff details before proceeding to the next step
     

     
       setCaseAndCourtDetails(data);
       setCurrentStep(4);
     
       // You may display an error message or handle it as needed
     
  };

  const handleDocumentUpload = (data) => {
    setDocumentDetails(data);
    setCurrentStep(5);
  };

  const handlePaymentChange = (data) => {
    setPaymentDetails(data);
    setCurrentStep(6);
  };

  const handlePublicAttorneyRequest = (data) => {
    setPublicAttorneyRequest(data);
    handleSubmit(data);
  };

  const navigate = useNavigate();
 
  const steps = [
    { title: 'Plaintiff Details' },
    { title: 'Defendant Details' },
    { title: 'Case and Court Details' },
    { title: 'Document Upload' },
    { title: 'Payment Details' },
    { title: 'Public Attorney Request' },
  ]; 
  
  const handleStepChange = (step) => {
    setCurrentStep(step + 1);
  };

  const handleSubmit = async (publicAttorneyRequestData) => {
    const id = user._id;
    try {
      const allFormData = {
        id,
        plaintiffDetails,
        defendantDetails,
        caseDetails,
        documents,
        paymentDetails,
        publicAttorneyRequest: publicAttorneyRequestData,
      };

      // ...
      const response = await axios.post('http://localhost:5000/file/case', allFormData);
      const caseNumber = response.data.caseNumber;

      toast.success(`Case filed successfully. Case number: ${caseNumber}`, {
        autoClose: 4000,
      });

      console.log('Data sent successfully!', allFormData);

      // Redirect after a delay of 3 seconds (3000 milliseconds)
      setTimeout(() => {
        navigate('/clientdashboard');
      }, 3000); // 3 seconds delay
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };

  return (
    <div className="case-filing-form">
      <Stepper steps={steps} activeStep={currentStep - 1} activeColor="#007bff" completeColor="#28a745" size={30} circleFontSize={12} onClick={(step) => handleStepChange(step)} />
      
      

      {currentStep === 1 && (
        <PlantiffDetailsForm onChange={handlePlaintiffChange} onNext={() => setCurrentStep(2)} />
      )}
      {currentStep === 2 && (
        <DefendantDetailsForm onChange={handleDefendantChange} onNext={() => setCurrentStep(3)} />
      )}
      {currentStep === 3 && (
        <CaseAndCourtDetailsForm onChange={handleCaseAndCourtChange} onNext={() => setCurrentStep(4)} />
      )}
     
      
    </div>
  );
};

export default PrivateAdvocateForm;