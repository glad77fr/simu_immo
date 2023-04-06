import { useState, useEffect } from 'react';
import InputField from './InputField';
import SelectField from './SelectFields';
import "../styles/forms.css"

function Forms() {
  const [price, setPrice] = useState(0);
  const [borrowed, setBorrowed] = useState(0);
  const [tax, setTax] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [borrowedAmount, setBorrowedAmount] = useState(0)
  const [borrowingRate, SetBorrowingRate] = useState('')

  const [buyingTypeSelected, setBuyingTypeSelected] = useState();

  const buyingType = [
    { label: 'Ancien', value: 'Ancien' },
    { label: 'Neuf', value: 'Neuf' },
  ];
  
  function handleChange(event) {
    const inputValue = Number(event.target.value);
    setPrice(inputValue);
    setTax(inputValue + inputValue * 0.08);
  }

  function checkBorrowAmount(event) {
    const enteredAmount = event.target.value
    {enteredAmount > 100 ? (()=> {alert("Le taux ne peux dépasser 100%"); SetBorrowingRate(0)})(): SetBorrowingRate(enteredAmount)}
  }

  function handleStateChange(setterFunction, event) {
    setterFunction(event.target.value);
  }
  
  function handleBuyingTypeChange(event) {
    setBuyingTypeSelected(event.target.value);
  }

  function handleBorrowingChange(event) {
    setBorrowedAmount(event.target.value);
  }

  useEffect(() => {
    if (buyingTypeSelected) {
      updateDisplayText(`Le bien acheté est un bien ${buyingTypeSelected.toLowerCase()}.`);
    }
  }, [buyingTypeSelected]);

  function updateDisplayText(text, index = 0) {
    if (index === 0) {
      setDisplayText(''); // Réinitialiser le displayText avant d'afficher le nouveau message
    }
    if (index < text.length) {
      setDisplayText((prevDisplayText) => prevDisplayText + text[index]);
      setTimeout(() => updateDisplayText(text, index + 1), 20); // 50 ms de délai entre chaque caractère
    }
  }


  return (
    <div className="formsContainer">
      
      <div className="part1">
      <div className="cards-container">
      <div className="card">
      
          <h3> Coûts d'acquisition </h3>
            <SelectField
            label="Type d'achat *"
            id="buyingType"
            options={buyingType}
            classType="form-select"
            onChange={(event)=>handleStateChange(setBuyingTypeSelected, event)}
            />

            <InputField
              label="Montant d'acquisition du bien *"
              id="immoPrice"
              onChange={handleChange}
              classValue="form-control"
            />

            <InputField
            label="Montant estimé des travaux"
            classValue="form-control"
            id="costWork"
            />
       </div>
      
       <div className="card">
            <h3> Financement </h3>
            <div className="sliderAndInput">
              <InputField
              id="borrowedRange"
              type="range"
              classValue="form-range"
              min={0}
              max={100000} // Vous pouvez définir le maximum selon vos besoins
              step={100} //
              value={borrowedAmount}
              onChange={handleBorrowingChange}
              containerClass="sliderAndInput"
              />

              <InputField
              label="Montant emprunté"
              id="borrowedAmount"
              classValue="form-control"
              value={borrowedAmount}
              onChange={handleBorrowingChange}
              containerClass="sliderAndInput"
              />
            </div>

            <InputField
            label="Taux d'emprunt"
            id="interestRate"
            classValue="form-control"
            onChange={checkBorrowAmount}
            max={100}
            value={borrowingRate}
             containerClass="sliderAndInput"
            />


            <InputField
            label="Revenus locatif mensuels estimés *"
            classValue="form-control"
            id="rentRevenue"
            />
       </div>
    </div>
    </div>
      <div className="part2">
        {displayText && <p>{displayText}</p>}
      </div>  
    </div>
  );
}

export default Forms;