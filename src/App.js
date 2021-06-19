import './App.css';
import { Service } from './service';
import { useState } from 'react';


const getGoogleRequest = (keyword, page = 0) => {
  const prefix = 'https://www.google.com/search?q=';
  const suffix = `&aqs=chrome..69i57.7704j0j7&sourceid=chrome&ie=UTF-8&start=${page * 10}`
  const googleTxt = keyword.replace(/\s/g, '+');
  return `${prefix}${googleTxt}${suffix}`
}

function App() {
  const [keyword, setKeyword] = useState('Property reports for 1946 aarons pass road, aarons pass 2850, nsw');
  const [domain, setDomain] = useState('infotrackgo.com');
  const [results, setResults] = useState([]);

  const requestPage = (page) => {
    let matches = [];
    const reqStr = getGoogleRequest(keyword, page);
    return Service.query(reqStr).then(({ data }) => {
      const split = data.split(`<div class="g">`);
      const linkTest = new RegExp(`<a href=\".*(${domain}.*)\"`);
      split.forEach((part, i) => {
        const res = linkTest.exec(part)
        if (res && res.length > 1) {
          matches.push([res, i])
        }
      });
      return matches;
    });
  }

  const submit = () => {
    const promises = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(index => requestPage(index));
    return Promise.all(promises)
    .then(res => {
      setResults(res);
    })
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="jumbo">SEO Checker</h1>
        <section className="center-dialog">
          <input placeholder="Keyword" value={keyword} onChange={(e) => setKeyword(e.target.value)}/>
          <input placeholder="Domain" value={domain} onChange={(e) => setDomain(e.target.value)}/>
          <button className="btn btn-primary" onClick={submit}>Search!</button>
        </section>
        <section>
          {results.map((res, i) => (
            <div key={`page-${i}`}>
              <h3>Page {i + 1}</h3>
              {res.map((result, j) => (
                <p key={`page-${i}-${j}`}>Found at position {result[1]}</p>
              ))}
            </div>
          ))}
        </section>
      </header>
    </div>
  );
}

export default App;
