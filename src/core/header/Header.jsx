import React from 'react';
import MainComponent from '../mainLayout/MainComponent';
import MenuComponent from '../menu/MenuComponent';

export default function Header(props) {
  return (
    <header>
      <MainComponent />
      <MenuComponent page={props.page.substr(1)} />
    </header>
  );
}
