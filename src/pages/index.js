import React from 'react'
import { Link } from 'gatsby'
import MainLayout from '~/layouts/MainLayout'
import SEO from '~/components/seo'
import Splash from '~/components/Splash'
import ProductGrid from '~/components/ProductGrid'

const IndexPage = () => (
  <>
    <SEO title="Home" keywords={[`edm`, `bass`, `raves`, `shop`, `merchandise`, `rave`, `warehouse`, `underground`]} />
    <MainLayout>
    <div className="content-wrapper">
      <Splash />
      <section id="about">
        <h2> Our Deal </h2>
        <p>Throwing parties is not all glamourous whether they are sweaty warehouse raves, bar shows, or large scale festivals. We take on all the sad work
        so we can provide the best experience for the DJs, listeners and the adventourus.
        For so many sad faces there many more smiles.</p>
      </section>
      <section id="store"><ProductGrid /></section>
      <section><button style={{ margin:'auto auto', display:'block' }} id="policy-button"><Link to="/policies">Returns & Private Policy</Link></button></section>
    </div>
    </MainLayout>
  </>
)

export default IndexPage
