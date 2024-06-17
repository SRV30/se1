import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAboutUs } from '../../../actions/aboutUsActions';
import { FaRegAddressBook, FaWhatsapp } from "react-icons/fa";
import { CiUser } from "react-icons/ci";
import { FaPhoneAlt } from "react-icons/fa";
import { FiMapPin } from "react-icons/fi";
import './AboutUs.css';

const AboutUs = () => {
  const dispatch = useDispatch();
  const { aboutUs, loading, error } = useSelector((state) => state.aboutUs);

  useEffect(() => {
    dispatch(fetchAboutUs());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="aboutUsContainer">
      <h2 className="aboutUsTitle">About Us</h2>
      {aboutUs && (
        <div className="aboutUsContent">
          <div className="aboutUsPhoto">
            {aboutUs.photoLink && <img src={aboutUs.photoLink} alt="Admin" />}
          </div>
          <div className="aboutUsInfo">
            <div className="aboutUsText">
              <p className="aboutUsName"><CiUser /><strong>Name:</strong> {aboutUs.name}</p>
              <p className="aboutUsDetail"><FaPhoneAlt /><strong>Phone:</strong> <a href={`tel:${aboutUs.phone}`} target='_blank' rel="noopener noreferrer" className="linkStyle">{aboutUs.phone}</a></p>
              <p className="aboutUsDetail"><FaWhatsapp /><strong>WhatsApp:</strong> <a href={`https://wa.me/91${aboutUs.whatsapp}`} target='_blank' rel="noopener noreferrer" className="linkStyle">{aboutUs.whatsapp}</a></p>
              <p className="aboutUsDetail"><FaRegAddressBook /><strong>Address:</strong> {aboutUs.address}</p>
              {aboutUs.mapLink && (
                <p className="mapLink">
                  <FiMapPin className="mapIcon" /><strong>Map Link:</strong> <a href={aboutUs.mapLink} target="_blank" rel="noopener noreferrer" className="linkStyle">View Map</a>
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AboutUs;
