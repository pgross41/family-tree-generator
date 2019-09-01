/**
 * Blank tree
 */
const date = new Date();
export default {
  "debugMode": false,
  "zoom": 1,
  "title": "My Family",
  "subTitle": `${date.toLocaleString('default', { month: 'long' })}, ${date.getFullYear()}`,
  "treeWidth": 2000,
  "treeHeight": 1000,
  "treeAngle": 180,
  "minAngleBetweenSibs": 5,
  "childOffsetFactor": 1.0,
  "edgeLeafOffsetAngle": 0,
  "members": [{}]
}