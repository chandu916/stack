import React from 'react';
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar';
import './ForTeams.css';

const teamBenefits = [
  'Centralize tribal knowledge from chats, docs, and pull request comments',
  'Reduce onboarding time by surfacing reusable answers and architecture decisions',
  'Let developers ask and answer in one searchable place',
  'Improve productivity with fewer repeated questions',
];

const ForTeams = ({ slideIn, onClose }) => {
  return (
    <div className='home-container-1'>
      <LeftSidebar slideIn={slideIn} onClose={onClose} />
      <div className='home-container-2 teams-page'>
        <section className='teams-hero'>
          <h1>For Teams</h1>
          <p>
            A private knowledge platform for your company, inspired by the Stack Overflow experience.
          </p>
        </section>

        <section className='teams-benefits'>
          <h2>Why teams use it</h2>
          <ul>
            {teamBenefits.map((benefit) => (
              <li key={benefit}>{benefit}</li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default ForTeams;
