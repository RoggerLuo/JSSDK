import React, { Component } from 'react';
import Cordova from 'shared/cordova';

export default WrappedComponent => {
    class PageComponent extends Component {
        constructor(props) {
            super(props);
        }
    
        componentWillMount() {
            
        }

        handleEmptyRightButton() {
            Cordova.ready().then(() => {
                Cordova.emptyRightButton();
            });
        }

        handleChangeTitle(title) {
            Cordova.ready().then(() => {
                Cordova.changeTitle(title);
            });
        }

        handleSetRightButton(btns) {
            Cordova.ready().then(() => {
                Cordova.setRightButton(btns);
            });
        }

        render() {
            return <WrappedComponent 
                {...this.props}
                setTitle={this.handleChangeTitle}
                emptyRightButton={this.handleEmptyRightButton}
                setRightButton={this.handleSetRightButton}
                 />;
        }
    }

    return PageComponent;
};
