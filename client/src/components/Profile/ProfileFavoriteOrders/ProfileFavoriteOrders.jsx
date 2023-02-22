import React, { useEffect, useState } from 'react';
import { listFavoriteOrders } from '../../../api/favoriteApi';
import ErrorAlert from '../../../errors/ErrorAlert';
import Card from '../../Card/Card';
const ProfileFavoriteOrders = ({ user_id }) => {
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]);
  useEffect(() => {
    (async () => {
      setError(null);
      try {
        const response = await listFavoriteOrders(user_id);
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
      <Card padding="p-0">
        <header className="p-3 border-b">
          <h3 className="font-lg font-semibold">Favorite Orders</h3>
        </header>

        {(Array.isArray(favorites) && favorites.length > 0 && (
          <ul>
            {favorites.map((favorite) => {
              return <li key={favorite.favorite.id}></li>;
            })}
          </ul>
        )) || <p className="p-3">No favorite orders available...</p>}
      </Card>
    </div>
  );
};

export default ProfileFavoriteOrders;
