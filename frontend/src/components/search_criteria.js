
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
function search_criteria(record_values, criteria_values) {
    console.log(record_values);
    console.log(criteria_values);
    return ""
}

const record_values = [
    {'column_name': 'name', 'column_value': 'John Smith'},
    {'column_name': 'address', 'column_value': 'Oxford UK'},
    {'column_name': 'occupation', 'column_value': 'Politician'}];

const criteria_values = [
    {
        'entity': 'fe1', 'logical_operator': 'OR', 'criteria':
            [
                {'keyword': 'John Smith', 'comparison_operator': 'EQUAL'},
                {'keyword': 'Oxford', 'comparison_operator': 'EQUAL'}
            ]
    },
    {
        'entity': 'fe2', 'logical_operator': 'OR', 'criteria':
            [
                {'keyword': 'London', 'comparison_operator': 'EQUAL'}
            ]
    }
];

search_criteria(record_values, criteria_values);