import { useState } from 'react';
import InputField from './InputField';
import SelectField from './SelectFields';
import "../styles/forms.css"

function Forms() {
  const [price, setPrice] = useState(0);
  const [borrowed, setBorrowed] = useState(0);
  const [tax, setTax] = useState(0);

  const buyingType = [
    { label: 'Ancien', value: 'Ancien' },
    { label: 'Neuf', value: 'Neuf' },
  ];

  function handleChange(event) {
    const inputValue = Number(event.target.value);
    setPrice(inputValue);
    setTax(inputValue + inputValue * 0.08);
  }

  return (
    <div class="container">
      <div className="part1">
          <SelectField
          label="Type d'achat *"
          id="buyingType"
          options={buyingType}
          classType="form-select"
          />

          <InputField
            label="Montant d'acquisition du bien"
            id="immoPrice"
            onChange={handleChange}
            class="form-control"
          />

          <InputField
          label="Montant emprunté"
          id="borrowedAmount"
          class="form-control"
          />

          <InputField
          label="Taux d'emprunt"
          id="interestRate"
          class="form-control"
          max={100}
          />

          <InputField
          label="Montant estimé des travaux"
          class="form-control"
          id="costWork"
          />

          <InputField
          label="Revenus locatif mensuels estimés"
          class="form-control"
          id="rentRevenue"
          />
        </div>

      <div className="part2">
        TOOOOOOOO

      </div>
      </div>
  );
}

export default Forms;