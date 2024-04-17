import React, { useState } from 'react';
import styled from 'styled-components';
import { useFetchSpecificCategory, useFetchSpecificPokemon } from '../pages/api/useFetch.js';
import PokemonList from './PokemonList.js';
import StatsModal from './StatsModal';
import SelectAndSearch from './SelectAndSearch.js';

export default function Pokemons({ categories }) {
  const [category, setCategory] = useState('all');
  const [searchValue, setSearchValue] = useState('');
  const [pokemonQuery, setPokemonQuery] = useState('');
  const [showModal, setShowModal] = useState(false);



  const { isLoading: isLoadingCategory, isError: isErrorCategory, data: pokemons } = useFetchSpecificCategory(category);
  const { isLoading: isLoadingPokemon, isError: isErrorPokemon, data: pokemon } = useFetchSpecificPokemon(pokemonQuery);
  console.log("isloadinggggggg", isLoadingPokemon);
  const handleModalClose = () => {
    setShowModal(false);
    setPokemonQuery('');
  };

  const renderContent = () => {
    if (isLoadingCategory) {
      return <LoadingMessage><i className="fa fa-spinner fa-spin fa-3x"></i></LoadingMessage>;
    }

    if (isErrorCategory) {
      return (
        <ErrorMessage>
          <i className="fa fa-exclamation-triangle fa-4x" aria-hidden="true"></i>
          <span>Error Call to PokeAPI!! Please Try Again Later...</span>
        </ErrorMessage>
      );
    }

    return (
      <PokemonListContainer>
        {
          isLoadingPokemon && <Backdrop>
            <i className="fa fa-spinner fa-spin fa-3x"></i>
          </Backdrop>
        }
        <PokemonList
          pokemons={pokemons}
          searchValue={searchValue}
          category={category}
          setPokemonQuery={setPokemonQuery}
          setShowModal={setShowModal}
        />
        {pokemonQuery && !isLoadingPokemon && !isErrorPokemon && (
          <StatsModal onClose={handleModalClose} show={showModal} pokemon={pokemon} />
        )}


      </PokemonListContainer>
    );
  };

  return (
    <>
      <SelectAndSearch
        category={category}
        setCategory={setCategory}
        categories={categories}
        setSearchValue={setSearchValue}
        isError={isErrorCategory}
      />
      {renderContent()}
    </>
  );
}

const LoadingMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 15% auto;
`;

const ErrorMessage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 15% auto;

  i {
    margin-bottom: 0.1em;
  }
`;

const PokemonListContainer = styled.div`
  display: grid;
  grid-auto-rows: max-content;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  justify-content: center;
  align-items: center;
  grid-gap: 1em;
  width: 100%;
  max-width: 100%;
  margin: 1.2em auto;
  padding: 1.3em 1em;
  height: 72vh;
  overflow-y: auto;
  
  ::-webkit-scrollbar {
    width: 0;
    background: transparent;
  }

  @media (max-width: 600.02px) {
    height: 62vh;
  }
`;




const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;
