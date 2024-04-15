import React from 'react';

export default function CustomFooter() {
  return (
    <footer className="footer">
      <section className="social-icons">
        <span>Get connected with us on social networks:</span>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-facebook-f"></i>
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-twitter"></i>
        </a>
        {/* Add more social links as needed */}
      </section>

      <div className="container">
        <div className="row">
          <div className="col">
            <h6>Company name</h6>
            <p>
              Here you can use rows and columns to organize your footer content. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            </p>
          </div>
          <div className="col">
            <h6>Products</h6>
            <p><a href="#!">Angular</a></p>
            <p><a href="#!">React</a></p>
            <p><a href="#!">Vue</a></p>
            <p><a href="#!">Laravel</a></p>
          </div>
          <div className="col">
            <h6>Useful Links</h6>
            <p><a href="#!">Pricing</a></p>
            <p><a href="#!">Settings</a></p>
            <p><a href="#!">Orders</a></p>
            <p><a href="#!">Help</a></p>
          </div>
          <div className="col">
            <h6>Contact</h6>
            <p><i className="fas fa-home me-2"></i> New York, NY 10012, US</p>
            <p><i className="fas fa-envelope me-3"></i> info@example.com</p>
            <p><i className="fas fa-phone me-3"></i> + 01 234 567 88</p>
            <p><i className="fas fa-print me-3"></i> + 01 234 567 89</p>
          </div>
        </div>
      </div>

      <div className="copyright">
        © 2021 Copyright:
        <a href="https://mdbootstrap.com/">MDBootstrap.com</a>
      </div>
    </footer>
  );
}
