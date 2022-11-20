import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import CardList from '../../components/card-list/card-list';
import Header from '../../components/header/header';
import Map from '../../components/map/map';
import { Offer, Offers } from '../../types/offer';

type MainPageProps = {
  favoritesCount: number;
  offers: Offers;
}

function MainPage({ favoritesCount, offers }: MainPageProps,): JSX.Element {
  // const [activeOfferId, setActiveOfferId] = useState(ZERO_ID);
  const [selectedPoint, setSelectedPoint] = useState<Offer | undefined>(
    undefined
  );

  const cities = [...new Set(offers.map((o) => o.city.name))];

  const onOfferListItemHover = (offerId: number) => {
    const currentPoint = offers.find((offer) => offer.id === offerId);
    setSelectedPoint(currentPoint);
  };

  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>6 городов. Главная</title>
      </Helmet>
      <Header favoritesCount={favoritesCount} />
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <ul className="locations__list tabs__list">
              {cities.map((c) => (
                <li key={c} className="locations__item">
                  <Link className="locations__item-link tabs__item" to="#">
                    <span>{c}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{offers.length} places to stay in Amsterdam</b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex={0}>
                  Popular
                  <svg className="places__sorting-arrow" width={7} height={4}>
                    <use xlinkHref="#icon-arrow-select" />
                  </svg>
                </span>
                <ul className="places__options places__options--custom">{/*places__options--opened*/}
                  <li className="places__option places__option--active" tabIndex={0}>Popular</li>
                  <li className="places__option" tabIndex={0}>Price: low to high</li>
                  <li className="places__option" tabIndex={0}>Price: high to low</li>
                  <li className="places__option" tabIndex={0}>Top rated first</li>
                </ul>
              </form>
              <div className="cities__places-list places__list tabs__content">
                <CardList offers={offers} onOfferListItemHover={onOfferListItemHover}/>
              </div>
            </section>
            <div className="cities__right-section">
              <section className="cities__map map">
                <Map city={offers[0].city} offers={offers} selectedPoint={selectedPoint}/>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainPage;
