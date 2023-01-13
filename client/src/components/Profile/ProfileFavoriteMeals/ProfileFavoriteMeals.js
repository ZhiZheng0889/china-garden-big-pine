import React, { useEffect, useState } from 'react';
import { listFavoriteMeals } from '../../../api/favoriteApi';
import ErrorAlert from '../../../errors/ErrorAlert';
import Card from '../../Card/Card';
const ProfileFavoriteMeals = ({ user_id }) => {
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]);
  useEffect(() => {
    (async () => {
      setError(null);
      try {
        const response = await listFavoriteMeals(user_id);
        if (response) {
          setFavorites(response);
        }
      } catch (error) {
        setError(error);
      }
    })();
  }, [user_id]);
  return (
    <div>
      <ErrorAlert error={error} classes={'mb-2'} />
      <Card>
        <h3 className="font-lg font-semibold">Favorite Meals</h3>
        {(Array.isArray(favorites) && favorites.length > 0 && (
          <ul>
            {favorites.map((favorite) => {
              return <li key={favorite.favorite.id}></li>;
            })}
          </ul>
        )) || <p>No favorite meals available...</p>}
      </Card>
    </div>
  );
};

export default ProfileFavoriteMeals;
