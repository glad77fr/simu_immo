import { useState, useEffect } from 'react';
import InputField from './InputField';
import SelectField from './SelectFields';
import "../styles/forms.css";

function Forms() {
  // State
  const [price, setPrice] = useState(0); // Prix du bien à l'achat hors frais de notaire
  const [tax, setTax] = useState(0); // Tax de notaire
  const [AmountNotaryFees, setAmountNotaryFees] = useState(0) // Montant des frais de notaire
  const [borrowedAmount, setBorrowedAmount] = useState(0); // Montant de l'emprunt
  const [borrowingRate, SetBorrowingRate] = useState(''); // Taux d'emprunt
  const [buyingTypeSelected, setBuyingTypeSelected] = useState(); // Type d'achat (neuf ou ancien)
  const [loanGuarentee, setloanGuarentee] = useState() // Montant du taux de garantie du pret
  const [displayPhrases, setDisplayPhrases] = useState({ // Phrases affichées
    buyingTypePhrase: "",
    taxPercentagePhrase: "",
    notaryFeesPhrase: "",
    pricePhrase:"",
    loanPaymentPhrase: "",
    insuranceMonthlyPaymentPhrase: "",
    totalLoanCostPhrase: "",
    costWorksPhrase: "",

  });

  const [loanDuration, setLoanDuration] = useState(0); // Durée du prêt
  const [montlyLoan, setMontlyLoan] = useState(0); // Montant mensuel du prêt
  const [montlyLoanInsurance, setMontlyLoanInsurance] = useState(0) // Montant mensuel de l'assurance
  const [totalLoanMontlyCost, setTotalLoanMontlyCost] = useState(0); // Montant mensuel total du pret
  const [costWorks, setCostWorks] = useState(0); // Montant des travaux

  // Constants
  const buyingType = [
    { label: 'Ancien', value: 'Ancien' },
    { label: 'Neuf', value: 'Neuf' },
  ];

  // Handlers
  function handleChange(event) {
    const inputValue = Number(event.target.value);
    setPrice(inputValue);
    setTax(inputValue + inputValue * 0.08);
  }

  function checkBorrowAmount(event) {
    const enteredAmount = event.target.value;
    if (enteredAmount > 100) {
      alert("Le taux ne peux dépasser 100%");
      SetBorrowingRate(0);
    } else {
      SetBorrowingRate(enteredAmount);
    }
  }

  function handleStateChange(setterFunction, event) {
    setterFunction(event.target.value);
  }

  function defineTax(event) {
    if (buyingTypeSelected == "Neuf") {
      setTax(2);}
    if (buyingTypeSelected == "Ancien") {
      setTax(8);
    }
  }

  function calculateLoanPayment(P, r, n) {
    const monthlyRate = r / 1200;
    const monthlyPayment =
      P * monthlyRate * Math.pow(1 + monthlyRate, n) / (Math.pow(1 + monthlyRate, n) - 1);
    return monthlyPayment;
  }

  function totalLoanCost(LoanCost, AssuranceLoanCost){
    {
      return LoanCost + AssuranceLoanCost
    };
  }
   
  function calculateInsuranceMonthlyPayment(P, a, n) {
    const numPayments = n * 12;
    const totalInsuranceCost = P * (a/100) * n;
    const monthlyInsurancePayment = totalInsuranceCost / numPayments;
  
    return monthlyInsurancePayment;
  }  

  useEffect(() => {
    if (buyingTypeSelected) {
      setDisplayPhrases((prevPhrases) => ({
        ...prevPhrases,
        buyingTypePhrase: `Le bien acheté est un bien ${buyingTypeSelected.toLowerCase()}.`,
      }));
      defineTax();
    }
  }, [buyingTypeSelected]);
  

  useEffect(() => {
    if (tax) {
      setDisplayPhrases((prevPhrases) => ({
        ...prevPhrases,
        taxPercentagePhrase: `Les frais de notaires sont de ${tax} % .`,
      }));
    }
  }, [tax]);

  useEffect(() => {
    if (montlyLoan && montlyLoanInsurance) {
      setTotalLoanMontlyCost(montlyLoan + montlyLoanInsurance);
      setDisplayPhrases((prevPhrases) => ({
        ...prevPhrases,
        totalLoanCostPhrase: `Le coût total mensuel du crédit est de ${totalLoanMontlyCost.toFixed(2)} € .`,
      }));
    }
  }, [montlyLoan, montlyLoanInsurance]);
  
  useEffect(() => {
    if (borrowedAmount > 0 && borrowingRate > 0 && loanDuration > 0) {
      setMontlyLoan(calculateLoanPayment(
        borrowedAmount,
        parseFloat(borrowingRate),
        loanDuration * 12)
      );
      setDisplayPhrases((prevPhrases) => ({
        ...prevPhrases,
        loanPaymentPhrase: `La mensualité du prêt est de ${montlyLoan.toFixed(2)} €.`,
      }));
    }
  }, [borrowedAmount, borrowingRate, loanDuration]);

  useEffect(() => {
    if (borrowedAmount > 0 && loanGuarentee > 0 && loanDuration > 0) {
      setMontlyLoanInsurance(calculateInsuranceMonthlyPayment(
        borrowedAmount,
        parseFloat(loanGuarentee),
        loanDuration
      ));
      setDisplayPhrases((prevPhrases) => ({
        ...prevPhrases,
        insuranceMonthlyPaymentPhrase: `La mensualité de l'assurance est de ${montlyLoanInsurance.toFixed(2)} €.`,
      }));
    }
  }, [borrowedAmount, loanGuarentee, loanDuration]);

  useEffect(() => {
    if (price) {
      setDisplayPhrases((prevPhrases) => ({
        ...prevPhrases,
        pricePhrase: `Le montant d'achat du bien est de ${price} € .`,
      }));
    }
  }, [price]);
  
  useEffect(() => {
    if (price && tax) {
      setAmountNotaryFees(price * (tax/100));
      setDisplayPhrases((prevPhrases) => ({
        ...prevPhrases,
        notaryFeesPhrase: `Le montant des frais de notaire est de  ${AmountNotaryFees} € .`,
      }));
    }
  }, [tax, price]);

  useEffect(() => {
    if (costWorks) {
      setDisplayPhrases((prevPhrases) => ({
        ...prevPhrases,
        costWorksPhrase: `Le montant des travaux initiaux est de  ${costWorks} € .`,
      }));
    }
  }, [costWorks]

  )

  // Render
  return (
    <div className="formsContainer">
      <div className="part1">
        <div className="cards-container">
          {/* Acquisition costs card */}
          <div className="card">
            <h3> Coûts d'acquisition </h3>
            <SelectField
              label="Type d'achat *"
              id="buyingType"
              options={buyingType}
              classType="form-select"
              onChange={(event) => handleStateChange(setBuyingTypeSelected, event)}
            />

            <InputField
              label="Montant du bien *"
              id="immoPrice"
              onChange={(event) => handleStateChange(setPrice, event)}
              classValue="form-control"
            />

            <InputField
              label="Montant estimé des travaux"
              classValue="form-control"
              id="costWork"
              value={costWorks}
              onChange={(event) => handleStateChange(setCostWorks, event)}
            />
          </div>
                    {/* Financing card */}
                    <div className="card">
            <h3> Financement </h3>
            <div className="sliderAndInput">
              <InputField
                id="borrowedRange"
                type="range"
                classValue="form-range"
                min={0}
                max={999999} // Set the maximum according to your needs
                step={5000} //
                value={borrowedAmount}
                onChange={(event) => handleStateChange(setBorrowedAmount, event)}
                containerClass="sliderAndInput"
              />

              <InputField
                label="Montant emprunté"
                id="borrowedAmount"
                classValue="form-control"
                value={borrowedAmount}
                onChange={(event) => handleStateChange(setBorrowedAmount, event)}
                containerClass="sliderAndInput"
              />
            </div>

            <div className="sliderAndInput">
              <InputField
                id="borrowedRange"
                type="range"
                classValue="form-range"
                min={0}
                max={20} // Set the maximum according to your needs
                step={1} //
                value={loanDuration}
                onChange={(event) => handleStateChange(setLoanDuration, event)}
                containerClass="sliderAndInput"
              />

              <InputField
                label="Durée (années)"
                id="borrowedAmount"
                classValue="form-control"
                value={loanDuration}
                onChange={(event) => handleStateChange(setLoanDuration, event)}
                containerClass="sliderAndInput"
              />
            </div>

            <div className="sliderAndInput">
              <InputField
                id="interestRateRange"
                type="range"
                classValue="form-range"
                min={0}
                max={5} // Set the maximum according to your needs
                step={0.01} //
                value={borrowingRate}
                onChange={(event) => handleStateChange(SetBorrowingRate, event)}
                containerClass="sliderAndInput"
              />

              <InputField
                label="Taux d'emprunt"
                id="interestRate"
                classValue="form-control"
                onChange={checkBorrowAmount}
                max={100}
                value={borrowingRate}
                containerClass="sliderAndInput"
              />
            </div>

            <div className="sliderAndInput">
              <InputField
                id="LoanGuarenteeRateRange"
                type="range"
                classValue="form-range"
                min={0}
                max={1} // Set the maximum according to your needs
                step={0.01} //
                value={loanGuarentee}
                onChange={(event) => handleStateChange(setloanGuarentee, event)}
                containerClass="sliderAndInput"
              />

              <InputField
                label="Taux d'assurance"
                id="LoanGuarentee"
                classValue="form-control"
                onChange={(event) => handleStateChange(setloanGuarentee, event)}
                max={1}
                value={loanGuarentee}
                containerClass="sliderAndInput"
              />
            </div>

            <InputField
              label="Revenus locatif mensuels estimés *"
              classValue="form-control"
              id="rentRevenue"
            />
          </div>
        </div>
      </div>
      <div className="part2">
        <h2> Evaluation de la rentabilité brute de votre projet</h2>
        {displayPhrases.buyingTypePhrase && <p>{displayPhrases.buyingTypePhrase}</p>}
        {displayPhrases.taxPercentagePhrase && <p>{displayPhrases.taxPercentagePhrase}</p>}
        {displayPhrases.pricePhrase && <p>{displayPhrases.pricePhrase}</p>}
        {displayPhrases.notaryFeesPhrase && <p>{displayPhrases.notaryFeesPhrase}</p>}
        {displayPhrases.costWorksPhrase && <p>{displayPhrases.costWorksPhrase }</p>}
        {displayPhrases.loanPaymentPhrase && <p>{displayPhrases.loanPaymentPhrase}</p>}
        {displayPhrases.insuranceMonthlyPaymentPhrase && <p>{displayPhrases.insuranceMonthlyPaymentPhrase}</p>}
        {displayPhrases.totalLoanCostPhrase && <p>{displayPhrases.totalLoanCostPhrase}</p>}
        
      </div>  
    </div>
  );
}

export default Forms;
