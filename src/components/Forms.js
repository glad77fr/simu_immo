import { useState, useEffect } from 'react';
import InputField from './InputField';
import SelectField from './SelectFields';
import "../styles/forms.css";
import PieChartComponent from './PieChartComponent';
import PieChartExpenses from './PieChartExpenses';
import 'chart.js/auto';


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
    rentAmountPhrase: "",
    grossYieldPhrase: "",
    contribution: "",
  });

  const [loanDuration, setLoanDuration] = useState(0); // Durée du prêt
  const [monthlyLoan, setMontlyLoan] = useState(0); // Montant mensuel du prêt
  const [monthlyLoanInsurance, setMontlyLoanInsurance] = useState(0) // Montant mensuel de l'assurance
  const [totalLoanMontlyCost, setTotalLoanMontlyCost] = useState(0); // Montant mensuel total du pret
  const [costWorks, setCostWorks] = useState(0); // Montant des travaux
  const [rentAmount, setRentAmount] = useState(0); // Montant du loyer mensuel
  const [grossYield, setGrossYield] = useState(0); // Rentabilité brute
  const [contribution, setContribution] = useState(0); // Apport

  // Constants
  const buyingType = [
    { label: 'Ancien', value: 'Ancien' },
    { label: 'Neuf', value: 'Neuf' },
  ];

  // Handlers

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
    let currentTax = 0;

    if (buyingTypeSelected === "Neuf") {
        currentTax = 2;
        setTax(currentTax);
    }
    if (buyingTypeSelected === "Ancien") {
        currentTax = 8;
        setTax(currentTax);
    }

    const currentAmountNotaryFees = price * (currentTax / 100);
    setAmountNotaryFees(currentAmountNotaryFees);

    setDisplayPhrases((prevPhrases) => ({
        ...prevPhrases,
        notaryFeesPhrase: `Le montant des frais de notaire est de ${currentAmountNotaryFees} € .`,
    }));
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

  function calculateGrossRate(mensualRent, totalCost) {
    const GrossRate = (mensualRent*12/totalCost)*100
    return GrossRate
  }

  useEffect(() => {
    if (buyingTypeSelected) {
      setDisplayPhrases((prevPhrases) => ({
        ...prevPhrases,
        buyingTypePhrase: `Le bien acheté est un bien ${buyingTypeSelected.toLowerCase()}.`,
      }));
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
    if (monthlyLoan && monthlyLoanInsurance) {
      setTotalLoanMontlyCost(monthlyLoan + monthlyLoanInsurance);
      setDisplayPhrases((prevPhrases) => ({
        ...prevPhrases,
        totalLoanCostPhrase: `Le coût total mensuel du crédit est de ${totalLoanMontlyCost.toFixed(2)} € .`,
      }));
    }
  }, [monthlyLoan, monthlyLoanInsurance]);
  
  useEffect(() => {
    if (borrowedAmount > 0 && borrowingRate > 0 && loanDuration > 0) {
      setMontlyLoan(calculateLoanPayment(
        borrowedAmount,
        parseFloat(borrowingRate),
        loanDuration * 12)
      );
      setDisplayPhrases((prevPhrases) => ({
        ...prevPhrases,
        loanPaymentPhrase: `La mensualité du prêt est de ${monthlyLoan.toFixed(2)} €.`,
      }));
    }
  }, [borrowedAmount, borrowingRate, loanDuration]);

  useEffect(() => {
    if (buyingTypeSelected && price > 0) {
      defineTax();
    }
  }, [buyingTypeSelected, price]);
  

  useEffect(() => {
    if (borrowedAmount > 0 && loanGuarentee > 0 && loanDuration > 0) {
      setMontlyLoanInsurance(calculateInsuranceMonthlyPayment(
        borrowedAmount,
        parseFloat(loanGuarentee),
        loanDuration
      ));
      setDisplayPhrases((prevPhrases) => ({
        ...prevPhrases,
        insuranceMonthlyPaymentPhrase: `La mensualité de l'assurance est de ${monthlyLoanInsurance.toFixed(2)} €.`,
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
    if (costWorks) {
      setDisplayPhrases((prevPhrases) => ({
        ...prevPhrases,
        costWorksPhrase: `Le montant des travaux initiaux est de  ${costWorks} € .`,
      }));
    }
  }, [costWorks]
  );

  useEffect(() => {
    if (rentAmount>0) {
      setDisplayPhrases((prevPhrases) => ({
        ...prevPhrases,
        rentAmountPhrase: `Le montant mensuel du loyer est de  ${rentAmount} € .`,
      }));
    }
  }, [rentAmount]
  );

  useEffect(() => {
    if (price>0 && rentAmount>0) {
      const totalPrice = Number(price) + Number(AmountNotaryFees) + Number(costWorks);
      const grossRateAmount = calculateGrossRate(Number(rentAmount),totalPrice);
      setGrossYield(grossRateAmount);

      setDisplayPhrases((prevPhrases) => ({
        ...prevPhrases,
        grossYieldPhrase: `Le taux de rentabilité brute est du projet est ${grossRateAmount.toFixed(2)} %.`,
      }));
    }
  }, [price,AmountNotaryFees, costWorks, rentAmount]
  );

  useEffect(()=> {
      if(price>0) {
        const financialContribution = (Number(price) + Number(costWorks)) - Number(borrowedAmount);
        setContribution(financialContribution);
        setDisplayPhrases((prevPhrases) => ({
          ...prevPhrases,
          contribution: `Votre apport est de ${financialContribution} €.`,
        }));
      }},
      [price, borrowedAmount,costWorks]
  );

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
         <div className="sliderAndInput">
            <InputField
                id="slicerImmoPrice"
                type="range"
                classValue="form-range"
                min={0}
                max={300000} // Set the maximum according to your needs
                step={5000} //
                value={price}
                onChange={(event) => handleStateChange(setPrice, event)}
                containerClass="sliderAndInput"
                
              />
            <InputField
              label="Montant du bien *"
              id="immoPrice"
              onChange={(event) => handleStateChange(setPrice, event)}
              classValue="form-control"
              value={price}
              containerClass="sliderAndInput"
              type="number"
            />
          </div>
          <div className="sliderAndInput">
          <InputField
                id="slicerCostWork"
                type="range"
                classValue="form-range"
                min={0}
                max={50000} // Set the maximum according to your needs
                step={1000} //
                value={costWorks}
                onChange={(event) => handleStateChange(setCostWorks, event)}
                containerClass="sliderAndInput"
                
              />
            <InputField
              label="Montant estimé des travaux"
              type="number"
              classValue="form-control"
              id="costWork"
              value={costWorks}
              onChange={(event) => handleStateChange(setCostWorks, event)}
              containerClass="sliderAndInput"
            />
          </div>
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
                max={300000} // Set the maximum according to your needs
                step={5000} //
                value={borrowedAmount}
                onChange={(event) => handleStateChange(setBorrowedAmount, event)}
                containerClass="sliderAndInput"
              />

              <InputField
                label="Montant emprunté"
                id="borrowedAmount"
                classValue="form-control"
                type="number"
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
                max={25} // Set the maximum according to your needs
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
          <div className="sliderAndInput">
          <InputField
                id="borrowedRange"
                type="range"
                classValue="form-range"
                min={300}
                max={1000} // Set the maximum according to your needs
                step={50} //
                value={rentAmount}
                onChange={(event) => handleStateChange(setRentAmount, event)}
                containerClass="sliderAndInput"
              />  
              <InputField
              label="Revenus locatif mensuels estimés"
              classValue="form-control"
              id="rentRevenue"
              value={rentAmount}
              onChange={(event) => handleStateChange(setRentAmount, event)}
              containerClass="sliderAndInput"
            />
            </div>
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
        {displayPhrases.rentAmountPhrase && <p>{displayPhrases.rentAmountPhrase}</p>}
        {displayPhrases.contribution && <p>{displayPhrases.contribution}</p>}
        {displayPhrases.grossYieldPhrase && <p>{displayPhrases.grossYieldPhrase}</p>}
        
        
        {monthlyLoan && monthlyLoanInsurance && rentAmount?(
      <PieChartComponent
      monthlyLoanAmount={monthlyLoan}
      monthlyInsuranceAmount={monthlyLoanInsurance}
      rentAmount={rentAmount}
      />
      ):null}
      
      {
        price || monthlyLoanInsurance || contribution ? (
          <PieChartExpenses
            totalLoanCost={borrowedAmount}
            costWorks={costWorks}
            contribution={contribution}
          />
        ) : null
      }
  

      </div>
      <div>
     
      </div>
    </div>
  );
}

export default Forms;
