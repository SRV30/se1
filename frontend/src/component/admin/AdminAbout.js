import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAboutUs, updateAboutUs } from '../../actions/aboutUsActions';
import './AdminAbout.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminAbout = () => {
  const dispatch = useDispatch();
  const { aboutUs, loading, error } = useSelector((state) => state.aboutUs);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    whatsapp: '',
    photoLink: '',
    address: '',
    mapLink: '',
  });

  useEffect(() => {
    dispatch(fetchAboutUs());
  }, [dispatch]);

  useEffect(() => {
    if (aboutUs) {
      setFormData({
        name: aboutUs.name,
        phone: aboutUs.phone,
        whatsapp: aboutUs.whatsapp,
        photoLink: aboutUs.photoLink,
        address: aboutUs.address,
        mapLink: aboutUs.mapLink,
      });
    }
  }, [aboutUs]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(updateAboutUs(formData));
      toast.success('About Us updated successfully');
    } catch (error) {
      toast.error('Failed to update About Us');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="adminAboutContainer">
      <ToastContainer />
      <h2 className="aboutUsTitle">Edit About Us</h2>
      <form className="adminAboutForm" onSubmit={handleSubmit}>
        <label className="adminFormLabel">Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} className="adminFormInput" required />
        
        <label className="adminFormLabel">Phone:</label>
        <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="adminFormInput" required />
        
        <label className="adminFormLabel">WhatsApp:</label>
        <input type="text" name="whatsapp" value={formData.whatsapp} onChange={handleChange} className="adminFormInput" required />
        
        <label className="adminFormLabel">Photo Link:</label>
        <input type="text" name="photoLink" value={formData.photoLink} onChange={handleChange} className="adminFormInput" />
        
        <label className="adminFormLabel">Address:</label>
        <input type="text" name="address" value={formData.address} onChange={handleChange} className="adminFormInput" />
        
        <label className="adminFormLabel">Map Link:</label>
        <input type="text" name="mapLink" value={formData.mapLink} onChange={handleChange} className="adminFormInput" />

        <button type="submit" className="adminSubmitButton">Update About Us</button>
      </form>
    </div>
  );
};

export default AdminAbout;
