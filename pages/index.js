import React from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import useInView from 'react-cool-inview';
import Image from 'next/image';
import Pokemons from '../components/Pokemons';
import { useFetchCategories } from '../pages/api/useFetch.js';

export default function Home() {
  const { isLoading, data: categories, isError } = useFetchCategories();


  const { observe, inView } = useInView({
    onEnter: ({ unobserve }) => unobserve(),
  });

  return (
    <>

      <Head>
        <title>PokeAPI - Coding Test</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <HomeContainer>
        <MainWrapper>
          <div style={{ paddingTop: '1em' }}>

            <Image
              src="/pokemon-logo.svg"
              alt="pokemon logo"
              height={100}
              width={200}
            />
          </div>
          {isLoading ? (
            <MessageContainer>
              <i className="fa fa-spinner fa-spin fa-5x"></i>
            </MessageContainer>
          ) : isError ? (
            <ErrorContainer>
              <i
                className="fa fa-exclamation-triangle fa-5x"
                aria-hidden="true"
              ></i>
              <span>Error Call to PokeAPI!! Please Try Again Later...</span>
            </ErrorContainer>
          ) : (
            <div ref={observe}>
              {inView && <Pokemons categories={categories} />}
            </div>
          )}
        </MainWrapper>
      </HomeContainer>
    </>
  );
}

/******************** styled components ************************/

const HomeContainer = styled.div`
  height: 100vh;
  background: linear-gradient(344deg, rgba(34, 193, 195, 1) 4%, rgb(0 0 0) 100%);
`;

const MainWrapper = styled.div`
  width: 90%;
  height: 80%;
  margin: 0 auto;
  color: #ffffff;
  h1 {
    letter-spacing: 0.2rem;
    font-weight: bold;
    padding-top: 1em;
  }
`;

const MessageContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ErrorContainer = styled(MessageContainer)`
  span {
    margin-top: 0.5em;
  }
`;
