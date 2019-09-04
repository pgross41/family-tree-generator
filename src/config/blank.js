/**
 * Blank tree
 */
const date = new Date();
export default {
  "debugMode": false,
  "zoom": 0.5,
  "title": "My Family",
  "subTitle": `${date.toLocaleString('default', { month: 'long' })}, ${date.getFullYear()}`,
  "treeWidth": 2000,
  "treeHeight": 1000,
  "treeAngle": 180,
  "minAngleBetweenSibs": 5,
  "edgeLeafOffsetAngle": 0,
  "wrapNames": false,
  "members": [{}]
}