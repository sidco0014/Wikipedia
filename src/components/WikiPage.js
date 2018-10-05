import React, {Component} from 'react';
import superagent from 'superagent';
import jsonp from 'superagent-jsonp';
import WikiResultItem from './WikiResultItem';


export default class WikiPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            results: [
                '', [], [], []
            ]
        };

        this.handleSearch = this.handleSearch.bind(this);
        this.onSubmitForm = this.onSubmitForm.bind(this);
    }

    handleSearch = (e) => {
        this.setState({
            title: e.target.value,
        })
    };

    onSubmitForm = (e) => {
        e.preventDefault();
        let wiki_url = 'https://en.wikipedia.org/w/api.php';
        let title = this.state.title;
        if (title.length === 0) {
            alert('Please enter your search keyword! ')
        }
        else {
            superagent.get(wiki_url)
                .query({
                    search: title,
                    action: 'opensearch',
                    format: 'json'
                })
                .use(jsonp({timeout: 10000}))
                .end((err, resp) => {
                    if (err) {
                        alert(err);
                    }
                    else {
                        this.setState({
                            results: resp.body,
                        });
                    }
                });
        }
    };

    render() {
        const style = {
            width: '60%',
            margin: 'auto',
        };
        return (
            <div className="container">
                <div style={style}>
                    <div className="row text-center">
                        <h1 className="text-primary mt-lg-5 w-100 text-center">Wikipedia</h1>
                    </div>
                    <div className="row mt-lg-3 pb-lg-3">
                        <form className="w-100" onSubmit={this.onSubmitForm}>
                            <div className="form-group">
                                <input className="form-control"
                                       value={this.state.title}
                                       onChange={this.handleSearch}/>
                            </div>
                            <div className="form-group text-center">
                                <button className="btn btn-success" type="submit">Submit</button>
                            </div>
                        </form>
                    </div>
                    <div className="row">
                        <WikiResultItem results={this.state.results}/>
                    </div>
                </div>
            </div>
        )
    }

}