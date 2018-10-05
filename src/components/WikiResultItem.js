import React, {Component} from 'react';

export default class ResultList extends Component {

    render() {
        let results = this.props.results[1].map((result, index) => {
            return (
                <div key={index}>
                    <h3>{this.props.results[1][index]}</h3>
                    <p>{this.props.results[2][index]}</p>
                    <a href={this.props.results[3][index]}
                       target="_blank">{this.props.results[3][index]}</a>
                    <hr/>
                </div>
            )
        });
        return (
            <div>
                {results}
            </div>);
    }
}