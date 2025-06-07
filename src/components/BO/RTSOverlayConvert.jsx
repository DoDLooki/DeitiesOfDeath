/**
 * Extract the header specifying the resources.
 *
 * @param {str} cellStr  String corresponding to the cell, already in lower case, and without space.
 *
 * @returns Array of resource names (in correct order) if found, otherwise null.
 */
function extractResourcesHeader(cellStr) {
  const keywords = ["food", "wood", "gold", "favor", "villager"];
  const matches = [];

  keywords.forEach((key) => {
    const regex = new RegExp(`\\b${key}\\b`, "gi"); // Match whole words, case-insensitive
    if (cellStr.match(regex)) {
      matches.push(key);
    }
  });

  // Ensure only valid groups are returned
  if ((matches.length === 4 && !matches.includes('villager')) || matches.length === 5) {
    return matches;
  }

  return null;
}

/**
 * Extract the resource values from a cell.
 *
 * @param {str} cellStr           String corresponding to the cell, already in lower case, and without space.
 * @param {Array} resourceFields  Fields with the resources in correct order, from 'extractResourcesHeader'.
 * @param {int} age               Current age (1: Archaic, 2: Classical...)
 * @param {bool} isGreek          true if Greek civilization.
 * 
 * @returns Resources as dictionary in RTS Overlay format for a single step, with the extracted resource values,
 *          null if not valid cell for resource values.
 */
function extractResources(cellStr, resourceFields, age, isGreek) {
  // Determine whether resourceFields includes a 'villager' (for worker count).
  const hasVillager = resourceFields.includes('villager');

  // Build the appropriate regex based on the size of resourceFields.
  let mainRegex;
  if (hasVillager && resourceFields.length === 5) {
    mainRegex = /(\d+)\/(\d+)\/(\d+)\/(\d+)\/(\d+)/; // For a 5-element array, we require "a/b/c/d/e"
  } else if (!hasVillager && resourceFields.length === 4) {
    mainRegex = /(\d+)\/(\d+)\/(\d+)\/(\d+)/; // For a 4-element array, we require "a/b/c/d"
  } else {
    console.log('Wrong size for \'resourceFields\':', resourceFields.length);
    return null; // Wrong size for 'resourceFields'
  }

  // Locate the main pattern
  const mainMatch = cellStr.match(mainRegex);
  if (!mainMatch) {
    return null; // Main substring is not found
  }

  // Extract the matched numbers (if 5 numbers then length 6 array, if 4 then length 5 array)
  const mainNumbers = mainMatch.slice(1).map(num => parseInt(num, 10));

  // Initialize result with the expected structure.
  let result = {
    age: age,
    worker_count: -1,
    resources: {
      food: 0,
      wood: 0,
      gold: 0,
      favor: 0
    },
    notes: []
  };

  // Map the main numbers to the fields found in resourceFields.
  if (hasVillager) {
    resourceFields.forEach((field, i) => {
      const value = mainNumbers[i];
      if (field === 'villager') {
        result.worker_count = value;
      } else if (['food', 'wood', 'gold', 'favor'].includes(field)) {
        result.resources[field] = value;
      }
    });
  }
  else { // No worker count provided
    resourceFields.forEach((field, i) => {
      if (['food', 'wood', 'gold', 'favor'].includes(field)) {
        result.resources[field] = mainNumbers[i];
      }
    });

    // Compute worker_count initially as food + wood + gold.
    result.worker_count = result.resources.food + result.resources.wood + result.resources.gold;

    // Add favor count for Greek gods
    if (isGreek) {
      result.worker_count += result.resources.favor;
    }
  }

  // Look for a time substring "f:g"
  const timeRegex = /(\d+:\d+)/;
  const timeMatch = cellStr.match(timeRegex);
  if (timeMatch) {
    result.time = timeMatch[0];
  }

  // Look for an extra integer (as builder) in the string after the main resource substring.
  let afterMain = cellStr.substring(mainMatch.index + mainMatch[0].length);
  // Remove the time substring from the extra part (if it appears there)
  if (timeMatch && afterMain.includes(timeMatch[0])) {
    afterMain = afterMain.replace(timeMatch[0], '');
  }
  const builderRegex = /\d+/;
  const builderMatch = afterMain.match(builderRegex);
  if (builderMatch) {
    const builderVal = parseInt(builderMatch[0], 10);
    result.resources.builder = builderVal;
    // In the 4-field case, add builder's value to worker_count.
    if (!hasVillager) {
      result.worker_count += builderVal;
    }
  }

  return result;
}

/**
 * Convert Raw Build Order (BO) to RTS Overlay format.
 *
 * @param {Object} rawBO  Raw Build Order (extracted from Excel file), as dictionary.
 *
 * @returns Dictionary with the BO in RTS Overlay format.
 */
function convertBOToRtsOverlay(rawBO) {
  // Initialize RTS Ovleray format
  let result = {
    'name': rawBO['title'],
    'major_god': rawBO['god'].charAt(0).toUpperCase() + rawBO['god'].slice(1), // Upper case for first letter
    'author': 'Deities of Death',
    'source': 'https://thedodclan.com/build-orders',
    'build_order': []
  };

  let age = 1; // Current age, starting in Archaic (1)
  const isGreek = ['zeus', 'hades', 'poseidon'].includes(rawBO['god']);

  // Loop on the main sections (one per age/advance)
  rawBO["build"].forEach((item) => {
    // Compute age update
    const description = item['description'].toLowerCase();
    if (description.includes('archaic')) {
      age = 1;
    }
    else if (description.includes('classical')) {
      age = 2;
    }
    else if (description.includes('heroic')) {
      age = 3;
    }
    else if (description.includes('mythic')) {
      age = 4;
    }
    else if (description.includes('advance')) {
      age++;
      if (result.build_order.length > 0) { // Add advance as instruction
        result.build_order.at(-1).notes.push(item['description']);
      }
    }

    let currentStep = {}; // Store current step
    let previousNotes = []; // Store notes appearing before step resources
    let resourcesColumnID = -1; // Column ID of the resources header (-1 if not found)
    let resourceFields = []; // Fields (in correct order) extracted from the resources header

    // Loop on all the rows of the BO section
    item['steps'].forEach((row) => {

      // Loop on the cells of each row
      row.forEach((cellStr, columnID) => {
        if (cellStr !== '') {
          // Cell string with no space and in lower case
          const cellStrNoSpaceLower = cellStr.replace(/\s+/g, '').toLowerCase();

          // Check if cell corresponds to resources header
          const fields = (resourceFields.length === 0) ? extractResourcesHeader(cellStrNoSpaceLower) : null;
          if (fields) {
            // Store resource fields in correct order + corresponding column ID
            resourcesColumnID = columnID;
            resourceFields = fields;
          }
          else { // Not a resource header
            // Check if starting a new step by extracting resource values from the current cell
            const newStep = (columnID === resourcesColumnID) ? extractResources(cellStrNoSpaceLower, resourceFields, age, isGreek) : null;
            if (newStep) {
              if (Object.keys(currentStep).length !== 0) { // Store previous step if not empty
                result.build_order.push(currentStep);
              }
              // Start new step
              currentStep = Object.assign({}, newStep);
              if (previousNotes.length > 0) {
                currentStep.notes = previousNotes;
                previousNotes = [];
              }
            }
            else { // Normal cell (no header, no resources count) -> to store in the notes.
              cellStr.split("\r\n").forEach(part => { // Split based on line returns
                if (Object.keys(currentStep).length !== 0) { // Current step already started
                  currentStep.notes.push(part);
                }
                else { // Current step not yet started
                  previousNotes.push(part);
                }
              });
            }
          }
        }
      });
    });

    // Add the last computed step if not empty
    if (Object.keys(currentStep).length !== 0) {
      result.build_order.push(currentStep);
    }
  });

  return result; // Return BO in RTS Overlay format
}

export default convertBOToRtsOverlay;
