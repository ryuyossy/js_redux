import React from 'react';
import {Link} from 'react-router';
import BaseComponent from './BaseComponent';


class NewsHandler extends BaseComponent {
  constructor(props,context) {
    super(props,context);
    this.state = {};
  }

  render() {
    return (
      <div className="news">
        <div className="icon-preview">
          <div><i className="material-icons">view_module</i></div>
          <div><span>News</span></div>
        </div>
        <ul className="newsHandle">
          <li>
            <a href="">7.1 2015 会社の貸し出し金額がUSD10,000を超えました</a>
          </li>
          <li>
            <a href="">7.1 2015 会社の貸し出し金額がUSD10,000を超えました</a>
          </li>
          <li>
            <a href="">7.1 2015 会社の貸し出し金額がUSD10,000を超えました</a>
          </li>
          <li>
            <a href="">7.1 2015 会社の貸し出し金額がUSD10,000を超えました</a>
          </li>
          <li>
            <a href="">7.1 2015 会社の貸し出し金額がUSD10,000を超えました</a>
          </li>
          <li>
            <a href="">7.1 2015 会社の貸し出し金額がUSD10,000を超えました</a>
          </li>
        </ul>
      </div>
    );
  }
}

export default NewsHandler;
