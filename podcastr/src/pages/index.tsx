import React from "react";
import { GetStaticProps } from 'next';
import { Header } from "../components/Header";

//Essas props são carregadas pelo metodo getServerSideProps
export default function Home(props) {
  return (
    <div>
      <h1>Index</h1>
      <p>{JSON.stringify(props.episodes)}</p>
    </div>
  )
}

//Os dados carregados na props de um getServerSideProps são referenciados nas props padrões de componentes react.
//Os arquivos são carregados na camada do next, ou seja, quando solicitar a página ele já terá os dados carregados.
// --> export async function getServerSideProps() { //SSR


//Os arquivos são carregados na camada do next, ou seja, quando solicitar a página ele já terá os dados carregados.
//Carrega os dados se forma estática e só irá alterar os dados depois do tempo definido
export async function getStaticProps() { //SSG
  const response = await fetch("http://localhost:3333/episodes")
  const data = await response.json()

  return {
    props: {
      episodes: data
    },
    revalidate: 60 * 60 * 8
  }
}