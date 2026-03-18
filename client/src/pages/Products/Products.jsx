import React from 'react';
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar';
import './Products.css';

const products = [
  {
    title: 'Stack Overflow for Teams',
    description: 'Private Q&A knowledge sharing for your engineering team with secure access and better discoverability.',
  },
  {
    title: 'OverflowAI',
    description: 'Get AI-assisted answers grounded in your organization knowledge with transparent citations.',
  },
  {
    title: 'Advertising',
    description: 'Reach developers where they learn and solve technical problems using intent-based placements.',
  },
  {
    title: 'Collectives',
    description: 'Build an expert community around your technology and showcase trusted answers from maintainers.',
  },
];

const Products = ({ slideIn, onClose }) => {
  return (
    <div className='home-container-1'>
      <LeftSidebar slideIn={slideIn} onClose={onClose} />
      <div className='home-container-2 products-page'>
        <h1>Products</h1>
        <p className='products-intro'>Built for developers, engineering teams, and technical communities.</p>

        <div className='products-grid'>
          {products.map((product) => (
            <article key={product.title} className='product-card'>
              <h3>{product.title}</h3>
              <p>{product.description}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
