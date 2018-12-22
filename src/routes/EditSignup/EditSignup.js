import React from 'react';
import PropTypes from 'prop-types';
import Spinner from 'react-spinkit';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import * as EditSignupActions from '../../modules/editSignup/actions';
import './EditSignup.scss';

class EditSignup extends React.Component {
  static propTypes = {
    getSignupAndEventAsync: PropTypes.func.isRequired,
    deleteSignupAsync: PropTypes.func.isRequired,
    signup: PropTypes.object,
    event: PropTypes.object,
    error: PropTypes.bool,
    loading: PropTypes.bool,
    params: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.deleteSignup = this.deleteSignup.bind(this);
  }

  componentWillMount() {
    this.props.resetEventState();
    const { id, editToken } = this.props.params;
    this.props.getSignupAndEventAsync(id, editToken);
  }

  deleteSignup() {
    const { id, editToken } = this.props.params;
    this.props.deleteSignupAsync(id, editToken)
  }

  render() {
    if (this.props.deleted) {
      return (
        <div className="container align-items-center">
          <div className="EditSignup--wrapper">
            <h1>Ilmoittautumisesi poistettiin onnistuneesti</h1>
            <Link to="/" className="btn btn-default">
              Takaisin etusivulle
            </Link>
          </div>
        </div>
      );
    }
    if (this.props.error) {
      return (
        <div className="container align-items-center">
          <div className="EditSignup--wrapper">
            <h1>Hups, jotain meni pieleen</h1>
            <p>
              Ilmoittautumistasi ei löytynyt. Se saattaa olla jo poistettu, tai sitten jotain muuta kummallista
              tapahtui. Jos ilmoittautumisesi ei ole vielä poistunut, yritä kohta uudestaan.
            </p>
          </div>
        </div>
      );
    }

    if (this.props.loading) {
      return (
        <div className="container align-items-center">
          <div className="EditSignup--wrapper">
            <Spinner name="circle" fadeIn="quarter" />
          </div>
        </div>
      );
    }

    return (
      <div className="container align-items-center">
        <div className="EditSignup--wrapper">
          <h1>Poista ilmoittautuminen</h1>
          <p>
            Oletko varma että haluat poistaa ilmoittautumisesi tapahtumaan <strong>{this.props.event.title}?</strong>
          </p>
          <p>
            Jos poistat ilmoittautumisesi, menetät paikkasi jonossa. Jos kuitenkin muutat mielesi, voit aina
            ilmoittautua tapahtumaan uudelleen myöhemmin, mutta siirryt silloin jonon hännille.{' '}
            <strong>Tätä toimintoa ei voi perua.</strong>
          </p>
          <button onClick={this.deleteSignup} className="btn btn-danger">
            Poista ilmoittautuminen
          </button>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  getSignupAndEventAsync: EditSignupActions.getSignupAndEventAsync,
  deleteSignupAsync: EditSignupActions.deleteSignupAsync,
  resetEventState: EditSignupActions.resetEventState,
};

const mapStateToProps = state => ({
  event: state.editSignup.event,
  signup: state.editSignup.signup,
  error: state.editSignup.error,
  loading: state.editSignup.loading,
  deleted: state.editSignup.deleted,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditSignup);