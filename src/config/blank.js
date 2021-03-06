/**
 * Blank tree
 */
const date = new Date();
export default {
  "debugMode": false,
  "zoom": 0.5,
  "title": "My Family",
  "subTitle": `${date.toLocaleString('en-us', { month: 'long' })}, ${date.getFullYear()}`,
  "treeWidth": 2000,
  "treeAngle": 180,
  "minAngleBetweenSibs": 5,
  "edgeLeafOffsetAngle": 0,
  "wrapNames": false,
  "dateFormat": "MMMM D, YYYY",
  "members": [{}]
}