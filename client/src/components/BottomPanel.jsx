import React, { useState, useEffect } from 'react';

export default function BottomPanel(props) {
  const [order, setOrder] = useState('normal');
  const [completeness, setCompleteness] = useState('all');

  const checkOrder = (e) => {
    setOrder(e.target.id);
  };
  const checkCompleteness = (e) => {
    setCompleteness(e.target.id);
  };

  useEffect(() => {
    props.updateFilters(order, completeness);
  }, [order, completeness]);

  return (
    <div id='Panel'>
      <input
        onChange={(event) => checkOrder(event)}
        type='radio'
        name='order'
        id='normal'
        defaultChecked
      />
      <label htmlFor='normal'>Normal</label>
      <input
        onChange={(event) => checkOrder(event)}
        type='radio'
        name='order'
        id='reverse'
      />
      <label htmlFor='reverse'>Reverse</label>

      <input
        onChange={(event) => checkCompleteness(event)}
        type='radio'
        name='completeness'
        id='done'
      />
      <label htmlFor='done'>Done</label>
      <input
        onChange={(event) => checkCompleteness(event)}
        type='radio'
        name='completeness'
        id='undone'
      />
      <label htmlFor='undone'>Undone</label>
      <input
        onChange={(event) => checkCompleteness(event)}
        type='radio'
        name='completeness'
        id='all'
        defaultChecked
      />
      <label htmlFor='all'>All</label>
    </div>
  );
}
