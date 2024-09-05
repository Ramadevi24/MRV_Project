import React, { useState } from 'react';
import '../css/sample.css';

const FuelManager = () => {
  const [fuels, setFuels] = useState([
    { id: 1, type: 'Liquid Fuels', name: 'Aviation Gasoline', primary: false, ncv: 44.3, carbonContent: 19.1 },
    { id: 2, type: 'Liquid Fuels', name: 'Bitumen', primary: false, ncv: 40.2, carbonContent: 22 },
    { id: 3, type: 'Liquid Fuels', name: 'Crude Oil', primary: false, ncv: 42.3, carbonContent: 20 },
    { id: 4, type: 'Liquid Fuels', name: 'Ethane', primary: false, ncv: 46.4, carbonContent: 16.8 },
    { id: 5, type: 'Liquid Fuels', name: 'Gas/Diesel Oil', primary: false, ncv: 43, carbonContent: 20.2 },
    { id: 6, type: 'Liquid Fuels', name: 'Jet Gasoline', primary: false, ncv: 44.3, carbonContent: 19.1 },
    { id: 7, type: 'Liquid Fuels', name: 'Jet Kerosene', primary: false, ncv: 44.1, carbonContent: 19.5 },
    { id: 8, type: 'Liquid Fuels', name: 'Liquefied Petroleum Gases', primary: false, ncv: 47.3, carbonContent: 17.2 },
    { id: 9, type: 'Liquid Fuels', name: 'Lubricants', primary: false, ncv: 40.2, carbonContent: 20 },
    { id: 10, type: 'Liquid Fuels', name: 'Motor Gasoline', primary: true, ncv: 44.3, carbonContent: 18.9 },
    { id: 11, type: 'Liquid Fuels', name: 'Naphtha', primary: false, ncv: 44.5, carbonContent: 20 },
    { id: 12, type: 'Liquid Fuels', name: 'Natural Gas Liquids', primary: true, ncv: 44.2, carbonContent: 17.5 },
    { id: 13, type: 'Liquid Fuels', name: 'Orimulsion', primary: false, ncv: 27.5, carbonContent: 21 },
    { id: 14, type: 'Liquid Fuels', name: 'Other Kerosene', primary: false, ncv: 43.8, carbonContent: 19.6 },
    { id: 15, type: 'Liquid Fuels', name: 'Other Petroleum Products', primary: false, ncv: 40.2, carbonContent: 20 },
    { id: 16, type: 'Liquid Fuels', name: 'Paraffin Waxes', primary: false, ncv: 40.2, carbonContent: 20 },
    { id: 17, type: 'Liquid Fuels', name: 'Petroleum Coke', primary: false, ncv: 32.5, carbonContent: 26.6 },
    { id: 18, type: 'Liquid Fuels', name: 'Refinery Feedstocks', primary: false, ncv: 43, carbonContent: 20 },
    { id: 19, type: 'Liquid Fuels', name: 'Refinery Gas', primary: false, ncv: 49.5, carbonContent: 15.7 },
    { id: 20, type: 'Liquid Fuels', name: 'Residual Fuel Oil', primary: false, ncv: 40.4, carbonContent: 21.1 },
    { id: 21, type: 'Liquid Fuels', name: 'Shale Oil', primary: false, ncv: 38.1, carbonContent: 20 },
    { id: 22, type: 'Liquid Fuels', name: 'White Spirit and SBP', primary: false, ncv: 40.2, carbonContent: 20 },
    { id: 23, type: 'Solid Fuels', name: 'Anthracite', primary: false, ncv: 26.7, carbonContent: 25 },
    { id: 24, type: 'Solid Fuels', name: 'Blast Furnace Gas', primary: false, ncv: 2.47, carbonContent: 70.8 },
    { id: 25, type: 'Solid Fuels', name: 'Brown Coal Briquettes', primary: false, ncv: 20.7, carbonContent: 26.6 },
    { id: 26, type: 'Solid Fuels', name: 'Coal Tar', primary: true, ncv: 28, carbonContent: 22 },
  ]);

  const handleCheckboxChange = (id) => {
    setFuels(fuels.map(fuel => fuel.id === id ? { ...fuel, primary: !fuel.primary } : fuel));
  };


  let previousType = '';

  return (
    <div className="fuel-manager">
      <div className="conversion-factor">
        <label style={{fontWeight:'600'}}>Conversion Factor Type</label>
        <label style={{fontWeight:'600'}}>
          <input type="radio" name="conversionFactor" value="NCV" defaultChecked /> NCV
        </label>
        <label style={{fontWeight:'600'}}>
          <input type="radio" name="conversionFactor" value="GCV" /> GCV
        </label>
        <label>
          <input type="checkbox" /> Show user-defined fuels only
        </label>
      </div>
      <table className="fuel-table">
        <thead>
          <tr>
            <th></th>
            <th>Fuel Type</th>
            <th>Fuel Name</th>
            <th>Primary Fuel</th>
            <th>Net Calorific Value (TJ/Gg)</th>
            <th>Carbon content (NCV) (kg C/GJ)</th>
          </tr>
        </thead>
        <tbody>
          {fuels.map((fuel, index) => {
            const showType = fuel.type !== previousType;
            const removeBorder = index > 0 && fuel.type === previousType;
            previousType = fuel.type;

            return (
              <tr key={fuel.id}>
                <td></td>
                <td className={showType ? '' : 'no-border-bottom'}
                    style={removeBorder ? { borderBottom: 'none' } : {}}
               >
                  {showType ? fuel.type : ''}
                </td>
                <td>{fuel.name}</td>
                <td style={{textAlign:'center'}}>
                  <input 
                    type="checkbox" 
                    checked={fuel.primary} 
                    onChange={() => handleCheckboxChange(fuel.id)} 
                  />
                </td>
                <td style={{textAlign:'center'}}>
                  {fuel.ncv}
                </td>
                <td style={{textAlign:'center'}}>
                 {fuel.carbonContent}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="footer-note">
        Type and Name of default fuels cannot be changed and default fuels cannot be deleted.<br/>
        Selected Conversion Factor Type is automatically applied in all the relevant worksheets across all the Inventory Years.<br/>
        Any user-specific biomass-derived fuel, e.g., dung, not covered in the definitions in table 1.1 (Vol.2, Chapter 1 of the 2006 IPCC Guidelines) shall be classified as "biomass-other"; these fuels are all considered "waste derived".<br/>
        Any user-specific fossil fuel not covered in the definitions in table 1.1 (Vol.2, Chapter 1 of the 2006 IPCC Guidelines) shall be classified as "Other fossil fuels"; these fuels are all considered "waste derived".
      </div>
      <div className="buttons">
        <button onClick={() => console.log(fuels)}>Save</button>
        <button onClick={() => setFuels([])}>Undo</button>
        <button onClick={() => console.log('Close')}>Close</button>
      </div>
    </div>
  );
};

export default FuelManager;

