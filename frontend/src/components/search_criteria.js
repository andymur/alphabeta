
// record_values is JSON array like [{'column_name': <column_name>, 'column_value': <column_value>},...]
//E.g.: [
//          {'column_name': 'name', 'column_value': 'John Smith'},
//          {'column_name': 'address', 'column_value': 'Oxford UK'},
//          {'column_name': 'occupation', 'column_value': 'Politician'}
//     ]

// criteria_values is JSON structure like
//     [
//          {'entity': <entity_name>, 'logical_operator': <operator>, criteria:
//              [
//                  {'keyword': <keyword_value>, 'comparison_operator': <operator>},...
//              ]},..
//    ]

//E.g.:
//     [
//          {
//              'entity': 'fe1', 'logical_operator': 'OR', 'criteria':
//              [
//                  {'keyword': 'John Smith', 'comparison_operator': 'EQUAL'},
//                  {'keyword': 'Oxford', 'comparison_operator': 'EQUAL'}
//              ]
//          },
//          {
//              'entity': 'fe2', 'logical_operator': 'OR', 'criteria':
//              [
//                  {'keyword': 'London', 'comparison_operator': 'EQUAL'}
//              ]
//          }
//    ]

// Output should be JSON array in format like below
// [
//      {
//          'entity': <entity_name>, 'logical_operator': <operator>, 'matches':
//            [
//                {'operator': <operator>, 'keyword': <keyword_value>, 'columns': [<column_name>,...]}
//            ],...
//     },...
// ]

// E.g.
// [
//      {
//          'entity': 'fe1', 'logical_operator': 'OR', 'matches':
//              [
//                  {'operator': 'EQUAL', 'keyword': 'John Smith', 'columns': ['name']}
//              ]
//      }
// ]

function map_values_to_columns(record_values) {
    return record_values.reduce((map, record) => {
        const { column_value, column_name } = record;
        if (!map[column_value]) {
            map[column_value] = [];
        }
        map[column_value].push(column_name);
        return map;
    }, {});
}

function search_criteria(record_values, entity_criteria_values) {
    const recordMap = map_values_to_columns(record_values);

    const result = []

    for (const entity_ind in entity_criteria_values) {
        const entity = entity_criteria_values[entity_ind];
        matched_criteria = []
        for (criteria_ind in entity['criteria']) {
            const criterion = entity['criteria'][criteria_ind];
            const matched_columns = []

            if (criterion.comparison_operator === "EQUAL" && criterion.keyword in recordMap) {
                // use predefined map of records for EQ case in order to reduce complexity
                matched_columns.push(recordMap[criterion.keyword]);
            } else {
                for (const record_ind in record_values) {
                    const record_value = record_values[record_ind];
                    if (criterion['keyword'] === record_value['column_value']) {
                        matched_columns.push(record_value['column_name']);
                    }
                }
            }

            if (matched_columns.length > 0) {
                matched_criteria.push(
                    {
                        'operator': criterion.comparison_operator,
                        'keyword': criterion.keyword,
                        'columns': matched_columns,
                    }
                );
            }
        }

        //handle logical operator, since even one faulty AND removes entity from the final result
        const entityShouldBeAdded = (entity.logical_operator === "AND"
            && entity.criteria.length === matched_criteria.length)
            || (entity.logical_operator === "OR" && matched_criteria.length > 0)

        if (entityShouldBeAdded) {
            result.push({
                'entity': entity.entity,
                'logical_operator': entity.logical_operator,
                'matches': matched_criteria
            })
        }
    }
    console.log(JSON.stringify(result, null, 2));
    return result
}

function search_criteria_complicated_enhanced(record_values, criteria_values) {
    // Transform record_values into a map for quick access
    const recordMap = record_values.reduce((map, record) => {
        map[record.column_name] = record.column_value;
        return map;
    }, {});

    // Process each criteria entity
    const result = [];

    for (const entity of criteria_values) {
        const matches = [];

        for (const criterion of entity.criteria) {
            const matchingColumns = [];

            for (const [columnName, columnValue] of Object.entries(recordMap)) {
                if (criterion.comparison_operator === 'EQUAL' && columnValue === criterion.keyword) {
                    matchingColumns.push(columnName);
                }
            }

            if (matchingColumns.length > 0) {
                matches.push({
                    operator: criterion.comparison_operator,
                    keyword: criterion.keyword,
                    columns: matchingColumns
                });
            }
        }

        if (matches.length > 0) {
            result.push({
                entity: entity.entity,
                logical_operator: entity.logical_operator,
                matches: matches
            });
        }
    }

    return result;
}


function search_criteria_complicated(record_values, criteria_values) {
    // Transform record_values into a map for quick access
    const recordMap = record_values.reduce((map, record) => {
        map[record.column_name] = record.column_value;
        return map;
    }, {});

    // Process each criteria entity
    return criteria_values.map(entity => {
        const matches = entity.criteria.map(criterion => {
            const matchingColumns = Object.entries(recordMap)
                .filter(([columnName, columnValue]) => {
                    if (criterion.comparison_operator === 'EQUAL') {
                        return columnValue === criterion.keyword;
                    }
                    // Add more operators here if needed
                    return false;
                })
                .map(([columnName]) => columnName);

            if (matchingColumns.length > 0) {
                return {
                    operator: criterion.comparison_operator,
                    keyword: criterion.keyword,
                    columns: matchingColumns
                };
            }
            return null;
        }).filter(match => match !== null); // Remove null matches

        return matches.length > 0
            ? { entity: entity.entity, logical_operator: entity.logical_operator, matches: matches }
            : null;
    }).filter(entityResult => entityResult !== null); // Remove null entities
}


const record_values = [
    {'column_name': 'name', 'column_value': 'John Smith'},
    {'column_name': 'address', 'column_value': 'Oxford UK'},
    {'column_name': 'occupation', 'column_value': 'Politician'},
    {'column_name': 'second_name', 'column_value': 'John Smith'}
];

const criteria_values = [
    {
        'entity': 'fe1', 'logical_operator': 'OR', 'criteria':
            [
                {'keyword': 'John Smith', 'comparison_operator': 'EQUAL'},
                {'keyword': 'Oxford', 'comparison_operator': 'EQUAL'}
            ]
    },
    {
        'entity': 'fe2', 'logical_operator': 'AND', 'criteria':
            [
                {'keyword': 'Oxford UK', 'comparison_operator': 'EQUAL'},
                {'keyword': 'Politician', 'comparison_operator': 'EQUAL'}
            ]
    }
];

search_criteria(record_values, criteria_values);