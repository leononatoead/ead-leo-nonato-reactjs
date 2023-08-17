import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <header>
      <Link to='/'> Home </Link>
      <Link to='/register'> Register </Link>
      <Link to='/validate'> Validar </Link>
    </header>
  );
}
