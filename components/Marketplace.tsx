import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Role, Product } from '../types';
import { PlusCircleIcon, XMarkIcon } from './Icons';

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
    const { findUserById, initiateDirectMessage, currentUser } = useAppContext();
    const seller = findUserById(product.sellerId);

    const handleCardClick = () => {
        if (currentUser?.id === product.sellerId) return; // Prevent sellers from messaging themselves
        initiateDirectMessage(product.sellerId, `Hi, I'm interested in your product: "${product.name}".`);
    }

    const getStrainColorClasses = (strain: 'Sativa' | 'Indica' | 'Hybrid') => {
        switch (strain) {
            case 'Sativa': return 'from-amber-500/20 to-amber-500/0 text-amber-300 ring-amber-500/30';
            case 'Indica': return 'from-purple-500/20 to-purple-500/0 text-purple-300 ring-purple-500/30';
            case 'Hybrid': return 'from-green-500/20 to-green-500/0 text-green-300 ring-green-500/30';
        }
    }

    return (
        <button 
            onClick={handleCardClick}
            disabled={currentUser?.id === product.sellerId}
            className="text-left bg-black/40 backdrop-blur-md rounded-xl shadow-lg overflow-hidden ring-1 ring-white/10 transition-all duration-300 hover:ring-purple-400/50 hover:shadow-2xl hover:shadow-purple-500/20 hover:-translate-y-1 group disabled:cursor-not-allowed disabled:opacity-60"
        >
            <div className="relative">
                <img src={product.imageUrl} alt={product.name} className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"/>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-4">
                    <h3 className="text-xl font-bold text-white">{product.name}</h3>
                </div>
                 <span className={`absolute top-4 right-4 px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-tr ring-1 ${getStrainColorClasses(product.strain)} backdrop-blur-sm`}>
                    {product.strain}
                </span>
            </div>
            <div className="p-4 flex-grow flex flex-col">
                <p className="text-gray-300 text-sm h-10 flex-grow">{product.description}</p>
                <div className="mt-4 flex justify-between items-center">
                    <div className="text-3xl font-extrabold text-white">
                        <span className="text-green-400">$</span>{product.price.toFixed(2)}
                    </div>
                    {seller && (
                        <div className="flex items-center space-x-2">
                           <div className="text-right">
                               <p className="text-sm font-medium text-white">{seller.username}</p>
                               <p className="text-xs text-gray-400">{seller.location}</p>
                           </div>
                           <img src={seller.avatarUrl} alt={seller.username} className="w-10 h-10 rounded-full ring-2 ring-white/10"/>
                        </div>
                    )}
                </div>
            </div>
        </button>
    );
}

const AddProductModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const { addProduct } = useAppContext();
    const [name, setName] = useState('');
    const [strain, setStrain] = useState<'Sativa' | 'Indica' | 'Hybrid'>('Hybrid');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !price || !description) {
            setError('All fields are required.');
            return;
        }
        const priceValue = parseFloat(price);
        if (isNaN(priceValue) || priceValue <= 0) {
            setError('Please enter a valid price.');
            return;
        }
        addProduct({ name, strain, price: priceValue, description });
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-lg">
            <div className="bg-black/50 backdrop-blur-2xl ring-1 ring-white/10 rounded-lg shadow-xl w-full max-w-md p-6 relative border border-white/10">
                 <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
                    <XMarkIcon className="w-6 h-6" />
                </button>
                <h2 className="text-2xl font-bold mb-4 text-white">Add New Product</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                     <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-300">Product Name</label>
                        <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} className="mt-1 bg-black/50 border-white/20 text-white text-sm rounded-md focus:ring-green-400 focus:border-green-400 block w-full p-2.5" />
                    </div>
                     <div>
                        <label htmlFor="strain" className="block text-sm font-medium text-gray-300">Strain</label>
                        <select id="strain" value={strain} onChange={e => setStrain(e.target.value as any)} className="mt-1 bg-black/50 border-white/20 text-white text-sm rounded-md focus:ring-green-400 focus:border-green-400 block w-full p-2.5">
                            <option>Sativa</option>
                            <option>Indica</option>
                            <option>Hybrid</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="price" className="block text-sm font-medium text-gray-300">Price</label>
                        <input type="number" id="price" value={price} onChange={e => setPrice(e.target.value)} step="0.01" className="mt-1 bg-black/50 border-white/20 text-white text-sm rounded-md focus:ring-green-400 focus:border-green-400 block w-full p-2.5" />
                    </div>
                     <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-300">Description</label>
                        <textarea id="description" value={description} onChange={e => setDescription(e.target.value)} rows={3} className="mt-1 bg-black/50 border-white/20 text-white text-sm rounded-md focus:ring-green-400 focus:border-green-400 block w-full p-2.5"></textarea>
                    </div>
                    {error && <p className="text-red-400 text-sm">{error}</p>}
                    <div className="flex justify-end pt-2">
                         <button
                            type="submit"
                            className="w-full inline-flex items-center justify-center px-4 py-2.5 border border-transparent text-sm font-medium rounded-md shadow-lg text-white bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black/50 focus:ring-green-400 transition-all transform hover:scale-105"
                        >
                            Add Product
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};


const Marketplace: React.FC = () => {
  const { products, currentUser } = useAppContext();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-6 pt-6">
        <div className="flex justify-end items-center">
            {currentUser?.role === Role.SELLER && (
                <button 
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-lg text-white bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black/50 focus:ring-green-400 transition-all transform hover:scale-105">
                    <PlusCircleIcon className="w-5 h-5 mr-2"/>
                    Add Product
                </button>
            )}
        </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {isModalOpen && <AddProductModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default Marketplace;