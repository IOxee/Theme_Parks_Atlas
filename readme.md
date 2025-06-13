<!-- <p align="center">
  <img src="https://github.com/IOxee/Theme_Parks_Atlas/raw/main/logo.png" alt="Theme Parks Atlas Logo" width="25%">
</p> -->

# Theme Parks Atlas

A Node.js command-line tool to explore theme parks in Spain and nearby: opening hours, expected visitor statistics, and live queue status of attractions.

## Description

Theme Parks Atlas allows you to search and query parks in Spain and nearby based on your location. Get:

* Opening and closing hours.
* Expected visitor statistics for the current day.
* Near real-time queue status of attractions (when supported by the public API).

## Features

* [x] Search parks by name or location
* [x] View opening and closing hours
* [x] Visitor statistics predictions for the day
* [x] Live wait times for attractions
* [x] Recommendations based on crowd data
* [ ] Easily extensible to new services and parks

## APIs

Theme Parks Atlas leverages several public APIs for accurate and up-to-date data:

* **Themeparks.wiki API**
  Base URL: `https://api.themeparks.wiki/v1`
  Key endpoints:

  * `/destinations` — List of available parks (filtered by country).
  * `/entity/{id}/children` — Attractions in a park.
  * `/entity/{id}/live` — Live wait times.

* **Queue-Times.com**
  For crowd calendar and predictions:

  * `https://queue-times.com/es/parks/{parkId}/calendar/{year}/{month}`

## Credits

Special thanks to all APIs and libraries that make Theme Parks Atlas possible:

* 🙌 [Themeparks.wiki](https://themeparks.wiki/) — Park and attraction data.
* 🙌 [Queue-Times.com](https://queue-times.com/) — Crowd predictions and calendars.
* 🙌 [Cheerio](https://cheerio.js.org/) — HTML parsing.
* 🙌 [Inquirer.js](https://github.com/SBoudrias/Inquirer.js/) — CLI prompts.

## Disclaimer

😞🙏 This project is for educational purposes only. I am not responsible for any misuse or damage caused by this program. Use it at your own risk.

## License
MIT License

Copyright (c) 2025 IOxee

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
