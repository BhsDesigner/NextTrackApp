import {API_DOMAIN} from "../config";

const downloadCSV = function (url, filename) {
    var fakeLink = document.createElement('a');
    fakeLink.style.display = 'none';
    document.body.appendChild(fakeLink);
    fakeLink.setAttribute('href', url);
    // fakeLink.setAttribute('target', '_blank');
    fakeLink.setAttribute('download', filename + ".csv");
    fakeLink.click();
};

export const exporter = posts => {
    downloadCSV(API_DOMAIN + posts[0].downloadUrl, 'posts'); // download as 'posts.csv` file
};
