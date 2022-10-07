import { Component } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { ImSearch } from 'react-icons/im'
import { SearchBar, SearchForm, SearchButton, SearchInput } from './Searchbar.Styled';


export default class SearchBox extends Component {
    state = {
        formQuery: '',
    };

    handleChange = e => {
        this.setState({ formQuery: e.currentTarget.value.toLowerCase() });
    };

    handleSearchboxSubmit = e => {
        e.preventDefault();
        if (this.state.formQuery.trim() === '') {
            toast.warning('please type the query!')
            return
        }
        this.props.onSubmit(this.state.formQuery);
        this.setState({ formQuery: '' });
    };

    render() {
        return (
            <SearchBar className="searchbar">
                <SearchForm className="form" onSubmit={this.handleSearchboxSubmit}>
                <SearchButton type="submit" className="button" >
                        <ImSearch />
                </SearchButton>

    <SearchInput
      className="input"
      value={this.state.formQuery}
      onChange={this.handleChange}
      type="text"
      autoComplete="off"
      autoFocus
      placeholder="Search images and photos"
    />
                </SearchForm>
        </SearchBar>
    );
    }
};

SearchBox.propTypes = {
    onSubmit: PropTypes.func,
};