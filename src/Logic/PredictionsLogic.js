import baseUrl from '../globals';

const handleSubmit = (formData, setSubmitEnabled, setSuccessMessage, successCount, setSuccessCount) => {
  // setSubmitEnabled(false);
  console.log(formData);
  
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ predictions: formData }),
    credentials: 'include',
  };

  fetch(`${baseUrl}/updatemanypredictions`, requestOptions)
  {/*.then((res) => {
    if (res.status === 200) {
      setSuccessMessage('Your predictions have been updated');
      setSuccessCount(successCount + 1);
    }
    setSubmitEnabled(true);
  });*/}
};

export default handleSubmit;
