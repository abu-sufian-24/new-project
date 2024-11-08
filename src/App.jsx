import { useEffect, useState } from "react";
import Navbar from "./component/navbar/Navbar";
import MeinSection from "./component/sections/MeinSection";
import ImgPopup from "./component/ImgPopup";
import SearchPopup from "./component/SearchPopup";
import AddToCartPopup from "./component/AddToCartPopup";
import FavoritePopup from "./component/FavoritePopup";
import { AlertDeletPopup } from "./component/AlertDeletPopup";

function App() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [openImgPopup, setOpenImgPopup] = useState(false);
  const [showFavoritesPopup, setShowFavoritesPopup] = useState(false);
  const [searchPopup, setSearchPopup] = useState(false);
  const [showAddToCartPopup, setShowAddToCartPopup] = useState(false);
  const [cartItem, setCartItem] = useState([]);
  const [favoriteItem, setFavoriteItem] = useState([]);

  const [itemToDelete, setItemToDelete] = useState(null);
  const [openAlertDeletePopup, setAlerDeletePopup] = useState(false);




  // Function to open delete confirmation modal with selected item
  const handleAlertPopup = (id) => {
    setItemToDelete(id);
    setAlerDeletePopup(true);
  };

  // Function to confirm delete
  const confirmDelete = () => {
    setCartItem((prevCart) => prevCart.filter(item => item.id !== itemToDelete));
    setAlerDeletePopup(false);
    setItemToDelete(null);
  };

  useEffect(() => {

    if (showFavoritesPopup || openImgPopup || searchPopup || showAddToCartPopup) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    return () => document.body.classList.remove("no-scroll");
  }, [showFavoritesPopup, openImgPopup, searchPopup, showAddToCartPopup]);




  const handleQuantityChange = (id, amount) => {
    setCartItem(cartItem.map(item =>
      item.id === id ? { ...item, Quantity: Math.max(1, item.Quantity + amount) } : item
    ));
  };

  const handleAddToCart = (data) => {
    const addDone = cartItem.find(item => item.id === data.id);
    if (!addDone) {
      setCartItem([...cartItem, { ...data, Quantity: 1 }]);
    }
  };

  const isInCart = (id) => cartItem.some(item => item.id === id);

  // Favorite management functions
  const handleAddToFavorite = (data) => {
    const isFavorite = favoriteItem.some(item => item.id === data.id);
    if (isFavorite) {
      setFavoriteItem(favoriteItem.filter(item => item.id !== data.id));
    } else {
      setFavoriteItem([...favoriteItem, data]);
    }
  };

  const handleDeleteFavoriteCart = (id) => {
    setFavoriteItem(favoriteItem.filter(item => item.id !== id));
  };

  const isFavorite = (id) => favoriteItem.some(item => item.id === id);

  // Popup handlers
  const handleOpenImgPopup = (item) => {
    setSelectedItem(item);
    setOpenImgPopup(true);
    setSearchPopup(false);
  };

  const handleCloseImgPopup = () => {
    setOpenImgPopup(false);
    setSelectedItem(null);
  };

  const handleSearch = () => setSearchPopup(true);

  return (
    <div>
      <Navbar cartItemCount={cartItem.length} onShowPopup={() => setShowAddToCartPopup(true)} />
      <MeinSection
        onAddToFavorite={handleAddToFavorite}
        onFavoritePopup={() => setShowFavoritesPopup(true)}
        onAdd={handleAddToCart}
        onSearch={handleSearch}
        onImgPopup={handleOpenImgPopup}
        isInCart={isInCart}
        isFavorite={isFavorite}
        favoriteCount={favoriteItem.length}
      />

      {/* AddToCart Popup */}
      {showAddToCartPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="w-full max-w-[1000px] max-h-[90vh] overflow-y-auto bg-white p-4 rounded-lg shadow-lg relative">
            <AddToCartPopup onAlert={handleAlertPopup} onQuantityChange={handleQuantityChange} newData={cartItem} onClose={() => setShowAddToCartPopup(false)} />
          </div>
        </div>
      )}

      {/* ImgPopup */}
      {openImgPopup && selectedItem && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="w-full max-w-4xl max-h-[80vh] overflow-y-auto bg-white p-6 rounded-lg shadow-lg relative">
            <ImgPopup isFavorite={isFavorite} onAddToFavorite={handleAddToFavorite} isInCart={isInCart} onAdd={handleAddToCart} item={selectedItem} onClose={handleCloseImgPopup} />
          </div>
        </div>
      )}

      {/* SearchPopup */}
      {searchPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="w-full max-w-[800px] max-h-[80vh] overflow-y-auto bg-white p-6 rounded-lg shadow-lg relative">
            <SearchPopup onImgPopup={handleOpenImgPopup} onClose={() => setSearchPopup(false)} />
          </div>
        </div>
      )}

      {/* Favorite Popup */}
      {showFavoritesPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="w-full max-w-[1000px] max-h-[90vh] overflow-y-auto bg-white p-6 rounded-lg shadow-lg relative">
            <FavoritePopup isInCart={isInCart} onAdd={handleAddToCart} onDelete={handleDeleteFavoriteCart} favoriteData={favoriteItem} onClose={() => setShowFavoritesPopup(false)} />
          </div>
        </div>
      )};
      {openAlertDeletePopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="w-full max-w-[400px] max-h-[400vh] overflow-y-auto bg-white  p-6 rounded-lg shadow-lg relative">
            <AlertDeletPopup
              OnConfirm={confirmDelete} // Confirm delete function
              open={openAlertDeletePopup}
              onClose={() => setAlerDeletePopup(false)} // Close modal on cancel
            />
          </div>

        </div>


      )}

    </div>
  );
}

export default App;
