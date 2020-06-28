import React, {useCallback, useState} from 'react';
import ReactDOM from 'react-dom';
import App from './Form.jsx';
import * as serviceWorker from './serviceWorker';

const config = {
  "type": "form",
  "props": {
    "id": "Не знаю нужно ли",
    "caption": "Имя модального окна",
    "styles": {
      "width": "900px",
      "height": "700px",
    },
    "outputFormat": "modified"
  },
  "content": [
    {
      "type": "tab",
      "props": {
        "id": "one",
        "caption": "One"
      },
      "content": [
        {
          "type": "panel",
          "props":
            {
              "caption": "Имя панели",
              "id": "h1",
              "multiple": true,
              // "noHeader": true,
              "inRow": true,
              "onlyFirstTitle": true,
              "collapsed": true,
            }
          ,
          "content":
            [
              {
                "type": "control",
                "props": {
                  "type": "string",
                  "id": "first",
                  "caption": "Первая космическая скорость",
                  "hint": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                  // "required": true,
                  // "defaultValue": "World",
                  "styles": {
                    "controlWidth": "200px"
                  },
                  required: true
                }
              },
              {
                "type": "control",
                "props": {
                  "type": "number",
                  "id": "second",
                  "caption": "Вторая",
                  "defaultValue": 16,
                  "styles": {
                    "controlWidth": "120px"
                  }
                }
              },
              {
                "type": "control",
                "props": {
                  "type": "select",
                  "id": "third",
                  "caption": "Третья",
                  "defaultValue": ["omsk", "msc"],
                  "withRequest": {
                    "url": "/someURL"
                  },
                  "multipleOptions": true,
                  "options": [
                    {"msc": "Moscow"},
                    {"spb": "Saint Petersburg"},
                    {"omsk": "Omsk"},
                    {"chel": "Chelyabinsk"}
                  ],
                  "styles": {
                    "controlWidth": "120px"
                  },
                  "condVisibility": {
                    "mode": "invisible",
                    "path": "one.h1.1.second",
                    "value": 17
                  }
                }
              },
              {
                "type": "control",
                "props": {
                  "type": "number",
                  "id": "fourth",
                  "caption": "Четвертая",
                  "defaultValue": 16,
                  "styles": {
                    "controlWidth": "120px"
                  }
                }
              },
              {
                "type": "control",
                "props": {
                  "type": "date",
                  "id": "fifth",
                  "caption": "Пятая",
                  // "defaultValue": 16,
                  "styles": {
                    "controlWidth": "120px"
                  }
                }
              },
              {
                "type": "control",
                "props": {
                  "type": "number",
                  "id": "sixth",
                  "caption": "Шестая космическая",
                  "defaultValue": 16,
                  "styles": {
                    "controlWidth": "120px"
                  }
                }
              },
              // {
              //   "type": "control",
              //   "props": {
              //     "type": "string",
              //     "id": "response-1",
              //     "caption": "Ответ-1",
              //     "defaultValue": "Madagascar",
              //     "styles": {
              //       "controlWidth": "300px"
              //     },
              //     "nextLine": true,
              //   }
              // },
              // {
              //   "type": "control",
              //   "props": {
              //     "type": "number",
              //     "id": "response-2",
              //     "caption": "Ответ-2",
              //     "defaultValue": 200,
              //     "styles": {
              //       "controlWidth": "300px"
              //     },
              //     "nextLine": true,
              //   }
              // },
              {
                "type": "panel",
                "props": {
                  "caption": "Параметры",
                  "id": "h2",
                  "multiple": true,
                  "noHeader": true,
                  "inRow": true,
                  "onlyFirstTitle": true,
                  "nextLine": true,
                  "collapsed": true,
                },
                "content": [
                  {
                    "type": "control",
                    "props": {
                      "type": "string",
                      "id": "first",
                      "caption": "Uno",
                      // "hint": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                      // "required": true,
                      "styles": {
                        "controlWidth": "120px",
                        "captionHeight": "1rem"
                      }
                    }
                  },
                  {
                    "type": "control",
                    "props": {
                      "type": "number",
                      "id": "second",
                      "caption": "Dos",
                      "defaultValue": 16,
                      "styles": {
                        "controlWidth": "120px",
                        "captionHeight": "1rem"
                      }
                    }
                  },
                  {
                    "type": "control",
                    "props": {
                      "type": "select",
                      "id": "third",
                      "caption": "Tres",
                      "defaultValue": "omsk",
                      "options": [
                        {"msc": "Moscow"},
                        {"spb": "Saint Petersburg"},
                        {"omsk": "Omsk"},
                        {"chel": "Chelyabinsk"}
                      ],
                      "styles": {
                        "controlWidth": "120px",
                        "captionHeight": "1rem"
                      },
                      "condVisibility": {
                        "mode": "invisible",
                        "path": "h1.1.second",
                        "value": 17
                      },
                      withRequest: true
                    }
                  },
                  {
                    "type": "panel",
                    "props": {
                      "caption": "Параметры",
                      "id": "h3",
                      "multiple": true,
                      "noHeader": true,
                      "inRow": true,
                      "onlyFirstTitle": true,
                      "nextLine": true,
                      "collapsed": true
                    },
                    "content": [
                      {
                        "type": "control",
                        "props": {
                          "type": "string",
                          "id": "first",
                          "caption": "Uno",
                          // "hint": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                          // "required": true,
                          "styles": {
                            "controlWidth": "120px",
                            "captionHeight": "1rem"
                          }
                        }
                      },
                      {
                        "type": "panel",
                        "props": {
                          "caption": "Параметры",
                          "id": "h4",
                          "multiple": true,
                          "noHeader": true,
                          "inRow": true,
                          "onlyFirstTitle": true,
                          "nextLine": true,
                          "collapsed": true
                        },
                        "content": [
                          {
                            "type": "control",
                            "props": {
                              "type": "string",
                              "id": "first",
                              "caption": "Uno",
                              // "hint": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                              // "required": true,
                              "styles": {
                                "controlWidth": "120px",
                                "captionHeight": "1rem"
                              }
                            }
                          },
                        ]
                      },
                    ]
                  },
                ]
              },
            ]
        },
        {
          "type": "panel",
          "props":
            {
              "caption": "Имя панели",
              "id": "h6",
              "multiple": true,
              // "noHeader": true,
              "inRow": true,
              "onlyFirstTitle": true,
              "collapsed": true,
            }
          ,
          "content":
            [
              {
                "type": "control",
                "props": {
                  "type": "string",
                  "id": "first",
                  "caption": "Первая космическая скорость",
                  "hint": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                  // "required": true,
                  "defaultValue": "AAA",
                  "styles": {
                    "controlWidth": "200px"
                  }
                }
              },
              {
                "type": "control",
                "props": {
                  "type": "number",
                  "id": "second",
                  "caption": "Вторая",
                  "defaultValue": 16,
                  "styles": {
                    "controlWidth": "120px"
                  }
                }
              },
              {
                "type": "control",
                "props": {
                  "type": "select",
                  "id": "third",
                  "caption": "Третья",
                  "defaultValue": ["omsk", "msc"],
                  "withRequest": {
                    "url": "/someURL"
                  },
                  "multipleOptions": true,
                  "options": [
                    {"msc": "Moscow"},
                    {"spb": "Saint Petersburg"},
                    {"omsk": "Omsk"},
                    {"chel": "Chelyabinsk"}
                  ],
                  "styles": {
                    "controlWidth": "120px"
                  },
                  "condVisibility": {
                    "mode": "invisible",
                    "path": "h1.1.second",
                    "value": 17
                  }
                }
              },
              {
                "type": "control",
                "props": {
                  "type": "number",
                  "id": "fourth",
                  "caption": "Четвертая",
                  "defaultValue": 16,
                  "styles": {
                    "controlWidth": "120px"
                  }
                }
              },
              {
                "type": "control",
                "props": {
                  "type": "date",
                  "id": "fifth",
                  "caption": "Пятая",
                  // "defaultValue": 16,
                  "styles": {
                    "controlWidth": "120px"
                  }
                }
              },
              {
                "type": "control",
                "props": {
                  "type": "number",
                  "id": "sixth",
                  "caption": "Шестая космическая",
                  "defaultValue": 16,
                  "styles": {
                    "controlWidth": "120px"
                  }
                }
              },
              // {
              //   "type": "control",
              //   "props": {
              //     "type": "string",
              //     "id": "response-1",
              //     "caption": "Ответ-1",
              //     "defaultValue": "Madagascar",
              //     "styles": {
              //       "controlWidth": "300px"
              //     },
              //     "nextLine": true,
              //   }
              // },
              // {
              //   "type": "control",
              //   "props": {
              //     "type": "number",
              //     "id": "response-2",
              //     "caption": "Ответ-2",
              //     "defaultValue": 200,
              //     "styles": {
              //       "controlWidth": "300px"
              //     },
              //     "nextLine": true,
              //   }
              // },
              {
                "type": "panel",
                "props": {
                  "caption": "Параметры",
                  "id": "h2",
                  "multiple": true,
                  "noHeader": true,
                  "inRow": true,
                  "onlyFirstTitle": true,
                  "nextLine": true,
                  "collapsed": true,
                },
                "content": [
                  {
                    "type": "control",
                    "props": {
                      "type": "string",
                      "id": "first",
                      "caption": "Uno",
                      // "hint": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                      // "required": true,
                      "styles": {
                        "controlWidth": "120px",
                        "captionHeight": "1rem"
                      }
                    }
                  },
                  {
                    "type": "control",
                    "props": {
                      "type": "number",
                      "id": "second",
                      "caption": "Dos",
                      "defaultValue": 16,
                      "styles": {
                        "controlWidth": "120px",
                        "captionHeight": "1rem"
                      }
                    }
                  },
                  {
                    "type": "control",
                    "props": {
                      "type": "select",
                      "id": "third",
                      "caption": "Tres",
                      "defaultValue": "omsk",
                      "options": [
                        {"msc": "Moscow"},
                        {"spb": "Saint Petersburg"},
                        {"omsk": "Omsk"},
                        {"chel": "Chelyabinsk"}
                      ],
                      "styles": {
                        "controlWidth": "120px",
                        "captionHeight": "1rem"
                      },
                      "condVisibility": {
                        "mode": "invisible",
                        "path": "h1.1.second",
                        "value": 17
                      },
                      withRequest: true
                    }
                  },
                  {
                    "type": "panel",
                    "props": {
                      "caption": "Параметры",
                      "id": "h3",
                      "multiple": true,
                      "noHeader": true,
                      "inRow": true,
                      "onlyFirstTitle": true,
                      "nextLine": true,
                      "collapsed": true
                    },
                    "content": [
                      {
                        "type": "control",
                        "props": {
                          "type": "string",
                          "id": "first",
                          "caption": "Uno",
                          // "hint": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                          // "required": true,
                          "styles": {
                            "controlWidth": "120px",
                            "captionHeight": "1rem"
                          }
                        }
                      },
                      {
                        "type": "panel",
                        "props": {
                          "caption": "Параметры",
                          "id": "h4",
                          "multiple": true,
                          "noHeader": true,
                          "inRow": true,
                          "onlyFirstTitle": true,
                          "nextLine": true,
                          "collapsed": true
                        },
                        "content": [
                          {
                            "type": "control",
                            "props": {
                              "type": "string",
                              "id": "first",
                              "caption": "Uno",
                              // "hint": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                              // "required": true,
                              "styles": {
                                "controlWidth": "120px",
                                "captionHeight": "1rem"
                              }
                            }
                          },
                        ]
                      },
                    ]
                  },
                ]
              },
            ]
        },
        {
          "type": "panel",
          "props":
            {
              "caption": "Имя панели",
              "id": "h7",
              "multiple": true,
              // "noHeader": true,
              "inRow": true,
              "onlyFirstTitle": true,
              "collapsed": true,
            }
          ,
          "content":
            [
              {
                "type": "control",
                "props": {
                  "type": "string",
                  "id": "first",
                  "caption": "Первая космическая скорость",
                  "hint": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                  // "required": true,
                  "defaultValue": "BBB",
                  "styles": {
                    "controlWidth": "200px"
                  }
                }
              },
              {
                "type": "control",
                "props": {
                  "type": "number",
                  "id": "second",
                  "caption": "Вторая",
                  "defaultValue": 16,
                  "styles": {
                    "controlWidth": "120px"
                  }
                }
              },
              {
                "type": "control",
                "props": {
                  "type": "select",
                  "id": "third",
                  "caption": "Третья",
                  "defaultValue": ["omsk", "msc"],
                  "withRequest": {
                    "url": "/someURL"
                  },
                  "multipleOptions": true,
                  "options": [
                    {"msc": "Moscow"},
                    {"spb": "Saint Petersburg"},
                    {"omsk": "Omsk"},
                    {"chel": "Chelyabinsk"}
                  ],
                  "styles": {
                    "controlWidth": "120px"
                  },
                  "condVisibility": {
                    "mode": "invisible",
                    "path": "h1.1.second",
                    "value": 17
                  }
                }
              },
              {
                "type": "control",
                "props": {
                  "type": "number",
                  "id": "fourth",
                  "caption": "Четвертая",
                  "defaultValue": 16,
                  "styles": {
                    "controlWidth": "120px"
                  }
                }
              },
              {
                "type": "control",
                "props": {
                  "type": "date",
                  "id": "fifth",
                  "caption": "Пятая",
                  // "defaultValue": 16,
                  "styles": {
                    "controlWidth": "120px"
                  }
                }
              },
              {
                "type": "control",
                "props": {
                  "type": "number",
                  "id": "sixth",
                  "caption": "Шестая космическая",
                  "defaultValue": 16,
                  "styles": {
                    "controlWidth": "120px"
                  }
                }
              },
              // {
              //   "type": "control",
              //   "props": {
              //     "type": "string",
              //     "id": "response-1",
              //     "caption": "Ответ-1",
              //     "defaultValue": "Madagascar",
              //     "styles": {
              //       "controlWidth": "300px"
              //     },
              //     "nextLine": true,
              //   }
              // },
              // {
              //   "type": "control",
              //   "props": {
              //     "type": "number",
              //     "id": "response-2",
              //     "caption": "Ответ-2",
              //     "defaultValue": 200,
              //     "styles": {
              //       "controlWidth": "300px"
              //     },
              //     "nextLine": true,
              //   }
              // },
              {
                "type": "panel",
                "props": {
                  "caption": "Параметры",
                  "id": "h2",
                  "multiple": true,
                  "noHeader": true,
                  "inRow": true,
                  "onlyFirstTitle": true,
                  "nextLine": true,
                  "collapsed": true,
                },
                "content": [
                  {
                    "type": "control",
                    "props": {
                      "type": "string",
                      "id": "first",
                      "caption": "Uno",
                      // "hint": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                      // "required": true,
                      "styles": {
                        "controlWidth": "120px",
                        "captionHeight": "1rem"
                      }
                    }
                  },
                  {
                    "type": "control",
                    "props": {
                      "type": "number",
                      "id": "second",
                      "caption": "Dos",
                      "defaultValue": 16,
                      "styles": {
                        "controlWidth": "120px",
                        "captionHeight": "1rem"
                      }
                    }
                  },
                  {
                    "type": "control",
                    "props": {
                      "type": "select",
                      "id": "third",
                      "caption": "Tres",
                      "defaultValue": "omsk",
                      "options": [
                        {"msc": "Moscow"},
                        {"spb": "Saint Petersburg"},
                        {"omsk": "Omsk"},
                        {"chel": "Chelyabinsk"}
                      ],
                      "styles": {
                        "controlWidth": "120px",
                        "captionHeight": "1rem"
                      },
                      "condVisibility": {
                        "mode": "invisible",
                        "path": "h1.1.second",
                        "value": 17
                      },
                      withRequest: true
                    }
                  },
                  {
                    "type": "panel",
                    "props": {
                      "caption": "Параметры",
                      "id": "h3",
                      "multiple": true,
                      "noHeader": true,
                      "inRow": true,
                      "onlyFirstTitle": true,
                      "nextLine": true,
                      "collapsed": true
                    },
                    "content": [
                      {
                        "type": "control",
                        "props": {
                          "type": "string",
                          "id": "first",
                          "caption": "Uno",
                          // "hint": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                          // "required": true,
                          "styles": {
                            "controlWidth": "120px",
                            "captionHeight": "1rem"
                          }
                        }
                      },
                      {
                        "type": "panel",
                        "props": {
                          "caption": "Параметры",
                          "id": "h4",
                          "multiple": true,
                          "noHeader": true,
                          "inRow": true,
                          "onlyFirstTitle": true,
                          "nextLine": true,
                          "collapsed": true
                        },
                        "content": [
                          {
                            "type": "control",
                            "props": {
                              "type": "string",
                              "id": "first",
                              "caption": "Uno",
                              // "hint": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                              // "required": true,
                              "styles": {
                                "controlWidth": "120px",
                                "captionHeight": "1rem"
                              }
                            }
                          },
                        ]
                      },
                    ]
                  },
                ]
              },
            ]
        },
        {
          "type": "panel",
          "props":
            {
              "caption": "Имя панели",
              "id": "h9",
              "multiple": true,
              // "noHeader": true,
              "inRow": true,
              "onlyFirstTitle": true,
              "collapsed": true,
            }
          ,
          "content":
            [
              {
                "type": "control",
                "props": {
                  "type": "string",
                  "id": "first",
                  "caption": "Первая космическая скорость",
                  "hint": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                  // "required": true,
                  "defaultValue": "BBB",
                  "styles": {
                    "controlWidth": "200px"
                  }
                }
              },
              {
                "type": "control",
                "props": {
                  "type": "number",
                  "id": "second",
                  "caption": "Вторая",
                  "defaultValue": 16,
                  "styles": {
                    "controlWidth": "120px"
                  }
                }
              },
              {
                "type": "control",
                "props": {
                  "type": "select",
                  "id": "third",
                  "caption": "Третья",
                  "defaultValue": ["omsk", "msc"],
                  "withRequest": {
                    "url": "/someURL"
                  },
                  "multipleOptions": true,
                  "options": [
                    {"msc": "Moscow"},
                    {"spb": "Saint Petersburg"},
                    {"omsk": "Omsk"},
                    {"chel": "Chelyabinsk"}
                  ],
                  "styles": {
                    "controlWidth": "120px"
                  },
                  "condVisibility": {
                    "mode": "invisible",
                    "path": "h1.1.second",
                    "value": 17
                  }
                }
              },
              {
                "type": "control",
                "props": {
                  "type": "number",
                  "id": "fourth",
                  "caption": "Четвертая",
                  "defaultValue": 16,
                  "styles": {
                    "controlWidth": "120px"
                  }
                }
              },
              {
                "type": "control",
                "props": {
                  "type": "date",
                  "id": "fifth",
                  "caption": "Пятая",
                  // "defaultValue": 16,
                  "styles": {
                    "controlWidth": "120px"
                  }
                }
              },
              {
                "type": "control",
                "props": {
                  "type": "number",
                  "id": "sixth",
                  "caption": "Шестая космическая",
                  "defaultValue": 16,
                  "styles": {
                    "controlWidth": "120px"
                  }
                }
              },
              // {
              //   "type": "control",
              //   "props": {
              //     "type": "string",
              //     "id": "response-1",
              //     "caption": "Ответ-1",
              //     "defaultValue": "Madagascar",
              //     "styles": {
              //       "controlWidth": "300px"
              //     },
              //     "nextLine": true,
              //   }
              // },
              // {
              //   "type": "control",
              //   "props": {
              //     "type": "number",
              //     "id": "response-2",
              //     "caption": "Ответ-2",
              //     "defaultValue": 200,
              //     "styles": {
              //       "controlWidth": "300px"
              //     },
              //     "nextLine": true,
              //   }
              // },
              {
                "type": "panel",
                "props": {
                  "caption": "Параметры",
                  "id": "h2",
                  "multiple": true,
                  "noHeader": true,
                  "inRow": true,
                  "onlyFirstTitle": true,
                  "nextLine": true,
                  "collapsed": true,
                },
                "content": [
                  {
                    "type": "control",
                    "props": {
                      "type": "string",
                      "id": "first",
                      "caption": "Uno",
                      // "hint": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                      // "required": true,
                      "styles": {
                        "controlWidth": "120px",
                        "captionHeight": "1rem"
                      }
                    }
                  },
                  {
                    "type": "control",
                    "props": {
                      "type": "number",
                      "id": "second",
                      "caption": "Dos",
                      "defaultValue": 16,
                      "styles": {
                        "controlWidth": "120px",
                        "captionHeight": "1rem"
                      }
                    }
                  },
                  {
                    "type": "control",
                    "props": {
                      "type": "select",
                      "id": "third",
                      "caption": "Tres",
                      "defaultValue": "omsk",
                      "options": [
                        {"msc": "Moscow"},
                        {"spb": "Saint Petersburg"},
                        {"omsk": "Omsk"},
                        {"chel": "Chelyabinsk"}
                      ],
                      "styles": {
                        "controlWidth": "120px",
                        "captionHeight": "1rem"
                      },
                      "condVisibility": {
                        "mode": "invisible",
                        "path": "h1.1.second",
                        "value": 17
                      },
                      withRequest: true
                    }
                  },
                  {
                    "type": "panel",
                    "props": {
                      "caption": "Параметры",
                      "id": "h3",
                      "multiple": true,
                      "noHeader": true,
                      "inRow": true,
                      "onlyFirstTitle": true,
                      "nextLine": true,
                      "collapsed": true
                    },
                    "content": [
                      {
                        "type": "control",
                        "props": {
                          "type": "string",
                          "id": "first",
                          "caption": "Uno",
                          // "hint": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                          // "required": true,
                          "styles": {
                            "controlWidth": "120px",
                            "captionHeight": "1rem"
                          }
                        }
                      },
                      {
                        "type": "panel",
                        "props": {
                          "caption": "Параметры",
                          "id": "h4",
                          "multiple": true,
                          "noHeader": true,
                          "inRow": true,
                          "onlyFirstTitle": true,
                          "nextLine": true,
                          "collapsed": true
                        },
                        "content": [
                          {
                            "type": "control",
                            "props": {
                              "type": "string",
                              "id": "first",
                              "caption": "Uno",
                              // "hint": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                              // "required": true,
                              "styles": {
                                "controlWidth": "120px",
                                "captionHeight": "1rem"
                              }
                            }
                          },
                        ]
                      },
                    ]
                  },
                ]
              },
            ]
        },
        {
          "type": "control",
          "props": {
            "type": "string",
            "id": "first",
            "caption": "Первая космическая скорость",
            "hint": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            // "required": true,
            // "defaultValue": "",
            "condVisibility": {
              "mode": "invisible",
              "path": "one.h1.0.second",
              "value": 17
            }
          }
        },
      ]
    },
    // {
    //   "type": "tab",
    //   "props": {
    //     "id": "one+",
    //     "caption": "Two"
    //   },
    //   "content" :[
    //     {
    //       "type": "panel",
    //       "props":
    //         {
    //           "caption": "Имя панели",
    //           "id": "h1",
    //           "multiple": true,
    //           // "noHeader": true,
    //           "inRow": true,
    //           "onlyFirstTitle": true,
    //           // "collapsed": true,
    //         }
    //       ,
    //       "content":
    //         [
    //           {
    //             "type": "control",
    //             "props": {
    //               "type": "string",
    //               "id": "first",
    //               "caption": "Первая космическая скорость",
    //               "hint": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    //               "required": true,
    //               // "defaultValue": "World",
    //               "styles": {
    //                 "controlWidth": "200px"
    //               }
    //             }
    //           },
    //           {
    //             "type": "control",
    //             "props": {
    //               "type": "number",
    //               "id": "second",
    //               "caption": "Вторая",
    //               "defaultValue": 16,
    //               "styles": {
    //                 "controlWidth": "120px"
    //               }
    //             }
    //           },
    //           {
    //             "type": "control",
    //             "props": {
    //               "type": "select",
    //               "id": "third",
    //               "caption": "Третья",
    //               "defaultValue": ["omsk", "msc"],
    //               "withRequest": {
    //                 "url": "/someURL"
    //               },
    //               "multipleOptions": true,
    //               "options": [
    //                 {"msc": "Moscow"},
    //                 {"spb": "Saint Petersburg"},
    //                 {"omsk": "Omsk"},
    //                 {"chel": "Chelyabinsk"}
    //               ],
    //               "styles": {
    //                 "controlWidth": "120px"
    //               },
    //               "condVisibility": {
    //                 "mode": "invisible",
    //                 "path": "h1.1.second",
    //                 "value": 17
    //               }
    //             }
    //           },
    //           {
    //             "type": "control",
    //             "props": {
    //               "type": "number",
    //               "id": "fourth",
    //               "caption": "Четвертая",
    //               "defaultValue": 16,
    //               "styles": {
    //                 "controlWidth": "120px"
    //               }
    //             }
    //           },
    //           {
    //             "type": "control",
    //             "props": {
    //               "type": "date",
    //               "id": "fifth",
    //               "caption": "Пятая",
    //               // "defaultValue": 16,
    //               "styles": {
    //                 "controlWidth": "120px"
    //               }
    //             }
    //           },
    //           {
    //             "type": "control",
    //             "props": {
    //               "type": "number",
    //               "id": "sixth",
    //               "caption": "Шестая космическая",
    //               "defaultValue": 16,
    //               "styles": {
    //                 "controlWidth": "120px"
    //               }
    //             }
    //           },
    //           // {
    //           //   "type": "control",
    //           //   "props": {
    //           //     "type": "string",
    //           //     "id": "response-1",
    //           //     "caption": "Ответ-1",
    //           //     "defaultValue": "Madagascar",
    //           //     "styles": {
    //           //       "controlWidth": "300px"
    //           //     },
    //           //     "nextLine": true,
    //           //   }
    //           // },
    //           // {
    //           //   "type": "control",
    //           //   "props": {
    //           //     "type": "number",
    //           //     "id": "response-2",
    //           //     "caption": "Ответ-2",
    //           //     "defaultValue": 200,
    //           //     "styles": {
    //           //       "controlWidth": "300px"
    //           //     },
    //           //     "nextLine": true,
    //           //   }
    //           // },
    //           {
    //             "type": "panel",
    //             "props": {
    //               "caption": "Параметры",
    //               "id": "h2",
    //               "multiple": true,
    //               "noHeader": true,
    //               "inRow": true,
    //               "onlyFirstTitle": true,
    //               "nextLine": true,
    //               "collapsed": true,
    //             },
    //             "content": [
    //               {
    //                 "type": "control",
    //                 "props": {
    //                   "type": "string",
    //                   "id": "first",
    //                   "caption": "Uno",
    //                   // "hint": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    //                   // "required": true,
    //                   "styles": {
    //                     "controlWidth": "120px",
    //                     "captionHeight": "1rem"
    //                   }
    //                 }
    //               },
    //               {
    //                 "type": "control",
    //                 "props": {
    //                   "type": "number",
    //                   "id": "second",
    //                   "caption": "Dos",
    //                   "defaultValue": 16,
    //                   "styles": {
    //                     "controlWidth": "120px",
    //                     "captionHeight": "1rem"
    //                   }
    //                 }
    //               },
    //               {
    //                 "type": "control",
    //                 "props": {
    //                   "type": "select",
    //                   "id": "third",
    //                   "caption": "Tres",
    //                   "defaultValue": "omsk",
    //                   "options": [
    //                     {"msc": "Moscow"},
    //                     {"spb": "Saint Petersburg"},
    //                     {"omsk": "Omsk"},
    //                     {"chel": "Chelyabinsk"}
    //                   ],
    //                   "styles": {
    //                     "controlWidth": "120px",
    //                     "captionHeight": "1rem"
    //                   },
    //                   "condVisibility": {
    //                     "mode": "invisible",
    //                     "path": "h1.1.second",
    //                     "value": 17
    //                   },
    //                   withRequest: true
    //                 }
    //               },
    //               {
    //                 "type": "panel",
    //                 "props": {
    //                   "caption": "Параметры",
    //                   "id": "h3",
    //                   "multiple": true,
    //                   "noHeader": true,
    //                   "inRow": true,
    //                   "onlyFirstTitle": true,
    //                   "nextLine": true,
    //                   "collapsed": true
    //                 },
    //                 "content": [
    //                   {
    //                     "type": "control",
    //                     "props": {
    //                       "type": "string",
    //                       "id": "first",
    //                       "caption": "Uno",
    //                       // "hint": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    //                       // "required": true,
    //                       "styles": {
    //                         "controlWidth": "120px",
    //                         "captionHeight": "1rem"
    //                       }
    //                     }
    //                   },
    //                   {
    //                     "type": "panel",
    //                     "props": {
    //                       "caption": "Параметры",
    //                       "id": "h4",
    //                       "multiple": true,
    //                       "noHeader": true,
    //                       "inRow": true,
    //                       "onlyFirstTitle": true,
    //                       "nextLine": true,
    //                       "collapsed": true
    //                     },
    //                     "content": [
    //                       {
    //                         "type": "control",
    //                         "props": {
    //                           "type": "string",
    //                           "id": "first",
    //                           "caption": "Uno",
    //                           // "hint": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    //                           // "required": true,
    //                           "styles": {
    //                             "controlWidth": "120px",
    //                             "captionHeight": "1rem"
    //                           }
    //                         }
    //                       },
    //                     ]
    //                   },
    //                 ]
    //               },
    //             ]
    //           },
    //         ]
    //     }
    //   ]
    // }
    // {
//   "type"
// :
//   "panel",
//     "props"
// :
//   {
//     "caption"
//   :
//     "Имя панели",
//       "id"
//   :
//     "h1",
//       "multiple"
//   :
//     true,
//       // "noHeader": true,
//       "inRow"
//   :
//     true,
//       "onlyFirstTitle"
//   :
//     true,
//       "collapsed"
//   :
//     true
//   }
// ,
//   "content"
// :
//   [
//     {
//       "type": "control",
//       "props": {
//         "type": "string",
//         "id": "first",
//         "caption": "Первая космическая скорость",
//         "hint": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//         // "required": true,
//         // "defaultValue": "",
//         "styles": {
//           "controlWidth": "200px"
//         }
//       }
//     },
//     {
//       "type": "control",
//       "props": {
//         "type": "number",
//         "id": "second",
//         "caption": "Вторая",
//         "defaultValue": 16,
//         "styles": {
//           "controlWidth": "120px"
//         }
//       }
//     },
//     {
//       "type": "control",
//       "props": {
//         "type": "select",
//         "id": "third",
//         "caption": "Третья",
//         "defaultValue": "omsk",
//         "withRequest": {
//           "url": "/someURL"
//         },
//         "options": [
//           {"msc": "Moscow"},
//           {"spb": "Saint Petersburg"},
//           {"omsk": "Omsk"},
//           {"chel": "Chelyabinsk"}
//         ],
//         "styles": {
//           "controlWidth": "120px"
//         },
//         "condVisibility": {
//           "mode": "invisible",
//           "path": "h1.1.second",
//           "value": 17
//         }
//       }
//     },
//     {
//       "type": "control",
//       "props": {
//         "type": "number",
//         "id": "fourth",
//         "caption": "Четвертая",
//         "defaultValue": 16,
//         "styles": {
//           "controlWidth": "120px"
//         }
//       }
//     },
//     {
//       "type": "control",
//       "props": {
//         "type": "number",
//         "id": "fifth",
//         "caption": "Пятая",
//         "defaultValue": 16,
//         "styles": {
//           "controlWidth": "120px"
//         }
//       }
//     },
//     {
//       "type": "control",
//       "props": {
//         "type": "number",
//         "id": "sixth",
//         "caption": "Шестая космическая",
//         "defaultValue": 16,
//         "styles": {
//           "controlWidth": "120px"
//         }
//       }
//     },
//     // {
//     //   "type": "control",
//     //   "props": {
//     //     "type": "string",
//     //     "id": "response-1",
//     //     "caption": "Ответ-1",
//     //     "defaultValue": "Madagascar",
//     //     "styles": {
//     //       "controlWidth": "300px"
//     //     },
//     //     "nextLine": true,
//     //   }
//     // },
//     // {
//     //   "type": "control",
//     //   "props": {
//     //     "type": "number",
//     //     "id": "response-2",
//     //     "caption": "Ответ-2",
//     //     "defaultValue": 200,
//     //     "styles": {
//     //       "controlWidth": "300px"
//     //     },
//     //     "nextLine": true,
//     //   }
//     // },
//     {
//       "type": "panel",
//       "props": {
//         "caption": "Параметры",
//         "id": "h2",
//         "multiple": true,
//         "noHeader": true,
//         "inRow": true,
//         "onlyFirstTitle": true,
//         "nextLine": true,
//         "collapsed": true
//       },
//       "content": [
//         {
//           "type": "control",
//           "props": {
//             "type": "string",
//             "id": "first",
//             "caption": "Uno",
//             // "hint": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//             // "required": true,
//             "styles": {
//               "controlWidth": "120px",
//               "captionHeight": "1rem"
//             }
//           }
//         },
//         {
//           "type": "control",
//           "props": {
//             "type": "number",
//             "id": "second",
//             "caption": "Dos",
//             "defaultValue": 16,
//             "styles": {
//               "controlWidth": "120px",
//               "captionHeight": "1rem"
//             }
//           }
//         },
//         {
//           "type": "control",
//           "props": {
//             "type": "select",
//             "id": "third",
//             "caption": "Tres",
//             "defaultValue": "omsk",
//             "options": [
//               {"msc": "Moscow"},
//               {"spb": "Saint Petersburg"},
//               {"omsk": "Omsk"},
//               {"chel": "Chelyabinsk"}
//             ],
//             "styles": {
//               "controlWidth": "120px",
//               "captionHeight": "1rem"
//             },
//             "condVisibility": {
//               "mode": "invisible",
//               "path": "h1.1.second",
//               "value": 17
//             }
//           }
//         },
//         {
//           "type": "panel",
//           "props": {
//             "caption": "Параметры",
//             "id": "h3",
//             "multiple": true,
//             "noHeader": true,
//             "inRow": true,
//             "onlyFirstTitle": true,
//             "nextLine": true,
//             "collapsed": true
//           },
//           "content": [
//             {
//               "type": "control",
//               "props": {
//                 "type": "string",
//                 "id": "first",
//                 "caption": "Uno",
//                 // "hint": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//                 // "required": true,
//                 "styles": {
//                   "controlWidth": "120px",
//                   "captionHeight": "1rem"
//                 }
//               }
//             },
//             {
//               "type": "panel",
//               "props": {
//                 "caption": "Параметры",
//                 "id": "h4",
//                 "multiple": true,
//                 "noHeader": true,
//                 "inRow": true,
//                 "onlyFirstTitle": true,
//                 "nextLine": true,
//                 "collapsed": true
//               },
//               "content": [
//                 {
//                   "type": "control",
//                   "props": {
//                     "type": "string",
//                     "id": "first",
//                     "caption": "Uno",
//                     // "hint": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//                     // "required": true,
//                     "styles": {
//                       "controlWidth": "120px",
//                       "captionHeight": "1rem"
//                     }
//                   }
//                 },
//               ]
//             },
//           ]
//         },
//       ]
//     },
//   ]
// }
  ]

// {
//   "type": "tab",
//   "props": {
//     "caption": "Основные",
//     "id": "general",
//   },
//   "content": [
//     {
//       "type": "panel",
//       "props": {
//         "caption": "Multiple-1",
//         "id": "h1",
//         "multiple": true
//       },
//       "content": [
//         {
//           "type": "control",
//           "props": {
//             "type": "string",
//             "id": "firstName",
//             "caption": "Name",
//             "hint": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//             "required": true,
//             "defaultValue": "Alex",
//             // "styles": {
//             //   "width": [8, 8]
//             // }
//           }
//         },
//         {
//           "type": "control",
//           "props": {
//             "type": "number",
//             "id": "age",
//             "caption": "Age",
//             "defaultValue": 16
//           }
//         },
//         {
//           "type": "panel",
//           "props": {
//             "caption": "Multiple-1",
//             "id": "h1",
//             "multiple": true
//           },
//           "content": [
//             {
//               "type": "control",
//               "props": {
//                 "type": "string",
//                 "id": "firstName",
//                 "caption": "Name",
//                 "hint": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//                 "required": true,
//                 "defaultValue": "",
//                 // "styles": {
//                 //   "width": [8, 8]
//                 // }
//               }
//             },
//             {
//               "type": "control",
//               "props": {
//                 "type": "number",
//                 "id": "age",
//                 "caption": "Age",
//                 "defaultValue": 16
//               }
//             },
//             {
//               "type": "control",
//               "props": {
//                 "type": "string",
//                 "id": "first",
//                 "caption": "AB",
//                 "defaultValue": "AB",
//                 "condVisibility": {
//                   "mode": "visible",
//                   "path": "general.h1.0.age",
//                   "value": 17
//                 }
//                 // "styles": {
//                 //   "width": [8, 8]
//                 // }
//               }
//             },
//             {
//               "type": "panel",
//               "props": {
//                 "caption": "Multiple-1",
//                 "id": "h1",
//                 "multiple": true
//               },
//               "content": [
//                 {
//                   "type": "control",
//                   "props": {
//                     "type": "string",
//                     "id": "firstName",
//                     "caption": "Name",
//                     "hint": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//                     "required": true,
//                     "defaultValue": "",
//                     // "styles": {
//                     //   "width": [8, 8]
//                     // }
//                   }
//                 },
//                 {
//                   "type": "control",
//                   "props": {
//                     "type": "number",
//                     "id": "age",
//                     "caption": "Age",
//                     "defaultValue": 16
//                   }
//                 },
//                 {
//                   "type": "control",
//                   "props": {
//                     "type": "string",
//                     "id": "first",
//                     "caption": "AB",
//                     "defaultValue": "AB",
//                     "condVisibility": {
//                       "mode": "visible",
//                       "path": "general.h1.0.age",
//                       "value": 17
//                     }
//                     // "styles": {
//                     //   "width": [8, 8]
//                     // }
//                   }
//                 },
//               ]
//             },
//           ]
//         },
//
//       ]
//     },
//
//
//     {
//       "type": "panel",
//       "props": {
//         "caption": "Multiple-2",
//         "id": "h2",
//         "multiple": true
//       },
//       "content": [
//         {
//           "type": "control",
//           "props": {
//             "type": "string",
//             "id": "firstName",
//             "caption": "Last name",
//             "defaultValue": "Smith"
//           }
//         }
//       ]
//     },
//     {
//       "type": "panel",
//       "props": {
//         "caption": "Multiple-3",
//         "id": "h5",
//         "multiple": true
//       },
//       "content": [
//         {
//           "type": "control",
//           "props": {
//             "type": "string",
//             "id": "firstName",
//             "caption": "Last name",
//             "defaultValue": "Smith"
//           }
//         }
//       ]
//     },
//     {
//       "type": "panel",
//       "props": {
//         "caption": "Single-1",
//         "id": "h3",
//       },
//       "content": [
//         {
//           "type": "control",
//           "props": {
//             "type": "string",
//             "id": "firstName",
//             "caption": "Last name",
//             "defaultValue": "Bravo"
//           }
//         }
//       ]
//     },

// {
//   "type": "panel",
//   "props": {
//     "caption": "Имя панели",
//     "id": "h1",
//     "multiple": true
//   },
//   "content": [
//     {
//       "type": "control",
//       "props": {
//         "type": "string",
//         "id": "firstName",
//         "caption": "Name",
//         "hint": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//         "defaultValue": "Alex"
//       }
//     },
//     {
//       "type": "control",
//       "props": {
//         "type": "number",
//         "id": "age",
//         "caption": "Age",
//         "defaultValue": 15
//       }
//     },
//   ]
// },

//
//     {
//       "type": "panel",
//       "props": {
//         "caption": "Имя панели",
//         "id": "h4",
//         "condVisibility": {
//           "mode": "visible",
//           "path": "general.h1.0.age",
//           "value": 17
//         }
//       },
//       "content": [
//         {
//           "type": "control",
//           "props": {
//             "type": "string",
//             "id": "firstName",
//             "caption": "Name",
//             "hint": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//             "defaultValue": "Alex"
//           }
//         },
//         {
//           "type": "control",
//           "props": {
//             "type": "number",
//             "id": "age",
//             "caption": "Age",
//             "defaultValue": 15
//           }
//         },
//         {
//           "type": "control",
//           "props": {
//             "type": "boolean",
//             "id": "agreement",
//             "caption": "Signature",
//             "defaultValue": true
//           }
//         },
//         {
//           "type": "control",
//           "props": {
//             "type": "date",
//             "id": "date",
//             "caption": "Date",
//             "defaultValue": "2020-05-12"
//           }
//         },
//         {
//           "type": "control",
//           "props": {
//             "type": "select",
//             "id": "cities",
//             "caption": "Country",
//             "defaultValue": "omsk",
//             "options": [
//               {"msc": "Moscow"},
//               {"spb": "Saint Petersburg"},
//               {"omsk": "Omsk"},
//               {"chel": "Chelyabinsk"}
//             ]
//           }
//         },
//       ]
//     },
//
//
//     {
//       "type": "control",
//       "props": {
//         "type": "select",
//         "id": "cities",
//         "condVisibility": {
//           "mode": "invisible",
//           "path": "general.h1.1.age",
//           "value": 17
//         },
//         "caption": "Country",
//         "defaultValue": "omsk",
//         "options": [
//           {"msc": "Moscow"},
//           {"spb": "Saint Petersburg"},
//           {"omsk": "Omsk"},
//           {"chel": "Chelyabinsk"}
//         ]
//       }
//     },
//     {
//       "type": "control",
//       "props": {
//         "type": "string",
//         "id": "empty",
//         "caption": "Empty",
//         "required": true,
//         "defaultValue": null,
//       }
//     },
//
//   ]
// },
// {
//   "type": "tab",
//   "props": {
//     "caption": "Остальное",
//     "id": "rest",
//     "condVisibility": {
//       "mode": "invisible",
//       "path": "general.h1.0.age",
//       "value": 17
//     },
//   },
//   "content": [
//     {
//       "type": "panel",
//       "props": {
//         "caption": "Имя панели",
//         "id": "h1",
//         "multiple": true
//       },
//       "content": [
//         {
//           "type": "control",
//           "props": {
//             "type": "string",
//             "id": "firstName",
//             "caption": "Name",
//             "hint": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//             "required": true,
//             "defaultValue": ""
//           }
//         },
//         {
//           "type": "control",
//           "props": {
//             "type": "number",
//             "id": "age",
//             "caption": "Age",
//             "defaultValue": 16
//           }
//         },
//       ]
//     },
//   ]
// },
// {
//   "type": "tab",
//   "props": {
//     "caption": "Третий",
//     "id": "third",
//     // "condVisibility": {
//     //   "mode": "invisible",
//     //   "path": "general.h1.0.age",
//     //   "value": 17
//     // },
//   },
//   "content": [
//     {
//       "type": "panel",
//       "props": {
//         "caption": "Имя панели",
//         "id": "h1",
//         "multiple": true
//       },
//       "content": [
//         {
//           "type": "control",
//           "props": {
//             "type": "string",
//             "id": "firstName",
//             "caption": "Name",
//             "hint": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//             "required": true,
//             "defaultValue": ""
//           }
//         },
//         {
//           "type": "control",
//           "props": {
//             "type": "number",
//             "id": "age",
//             "caption": "Age",
//             "defaultValue": 16
//           }
//         },
//       ]
//     },
//   ]
// },
// {
//   "type": "tab",
//   "props": {
//     "caption": "Основные",
//     "id": "general",
//   },
//   "content": [
//     {
//       "type": "panel",
//       "props": {
//         "caption": "Имя панели",
//         "id": "h1",
//       },
//       "content": [
//         {
//           "type": "control",
//           "props": {
//             "type": "string",
//             "id": "firstName",
//             "caption": "Name",
//             "hint": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//             "defaultValue": "Alex"
//           }
//         },
//         {
//           "type": "control",
//           "props": {
//             "type": "number",
//             "id": "age",
//             "caption": "Age",
//             "defaultValue": 15
//           }
//         },
//         {
//           "type": "control",
//           "props": {
//             "type": "boolean",
//             "id": "agreement",
//             "caption": "Signature",
//             "defaultValue": true
//           }
//         },
//         {
//           "type": "control",
//           "props": {
//             "type": "date",
//             "id": "date",
//             "caption": "Date",
//             "defaultValue": "2020-05-12"
//           }
//         },
//         {
//           "type": "control",
//           "props": {
//             "type": "select",
//             "id": "cities",
//             "caption": "Country",
//             "defaultValue": "omsk",
//             "options": [
//               {"msc": "Moscow"},
//               {"spb": "Saint Petersburg"},
//               {"omsk": "Omsk"},
//               {"chel": "Chelyabinsk"}
//             ]
//           }
//         },
//       ]
//     },
//     {
//       "type": "panel",
//       "props": {
//         "caption": "Имя панели",
//         "id": "h2"
//       },
//       "content": [
//         {
//           "type": "control",
//           "props": {
//             "type": "string",
//             "id": "firstName",
//             "caption": "Name",
//             "hint": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//             "defaultValue": "Alex"
//           }
//         },
//         {
//           "type": "control",
//           "props": {
//             "type": "number",
//             "id": "age",
//             "caption": "Age",
//             "defaultValue": 15
//           }
//         },
//         {
//           "type": "control",
//           "props": {
//             "type": "boolean",
//             "id": "agreement",
//             "caption": "Signature",
//             "defaultValue": true
//           }
//         },
//         {
//           "type": "control",
//           "props": {
//             "type": "date",
//             "id": "date",
//             "caption": "Date",
//             "defaultValue": "2020-05-12"
//           }
//         },
//         {
//           "type": "control",
//           "props": {
//             "type": "select",
//             "id": "cities",
//             "caption": "Country",
//             "defaultValue": "omsk",hike
//             "options": [
//               {"msc": "Moscow"},
//               {"spb": "Saint Petersburg"},
//               {"omsk": "Omsk"},
//               {"chel": "Chelyabinsk"}
//             ]
//           }
//         },
//       ]
//     },
//   ]
// },

// {
//   "type": "control",
//   "props": {
//     "type": "number",
//     "id": "moisture",
//     "caption": "Moisture",
//     "defaultValue": 15
//   }
// },
// {
//   "type": "tab",
//   "props": {
//     "caption": "Другое",
//     "id": "Other",
//   },
//   "content": [
//     {
//       "type": "panel",
//       "props": {
//         "caption": "Имя панели",
//         "id": "h1",
//         "multiple": true
//       },
//       "content": [
//         {
//           "type": "control",
//           "props": {
//             "type": "string",
//             "id": "firstName",
//             "caption": "Name",
//             "hint": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//             "required": true,
//             "defaultValue": ""
//           }
//         },
//         {
//           "type": "control",
//           "props": {
//             "type": "number",
//             "id": "age",
//             "caption": "Age",
//             "defaultValue": 16
//           }
//         },
//       ]
//     },
//   ]
// },

// {
//   "type": "panel",
//   "props": {
//     "caption": "Имя панели",
//     "id": "h1"
//   },
//   "content": [
//     {
//       "type": "control",
//       "props": {
//         "type": "string",
//         "id": "firstName",
//         "caption": "Name",
//         "hint": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//         "defaultValue": "Alex"
//       }
//     },
//     {
//       "type": "control",
//       "props": {
//         "type": "string",
//         "id": "lastName",
//         "caption": "LastName",
//         "hint": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//         "defaultValue": "Smith"
//       }
//     },
//     {
//       "type": "control",
//       "props": {
//         "type": "string",
//         "id": "hobby",
//         "caption": "Hobby",
//         "hint": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//         "defaultValue": "Hike"
//       }
//     },
//   ]
// },
// {
//   "type": "control",
//   "props": {
//     "type": "number",
//     "id": "age",
//     "caption": "Age",
//     "defaultValue": 15
//   }
// },
// {
//   "type": "control",
//   "props": {
//     "type": "number",
//     "id": "temperature",
//     "caption": "Temperature",
//     "defaultValue": 15
//   }
// },
// {
//   "type": "control",
//   "props": {
//     "type": "number",
//     "id": "moisture",
//     "caption": "Moisture",
//     "defaultValue": 15
//   }
// },
};
let value;
// value = {
//   one: {
//     h1: [
//       {
//         // first: "World - 2",
//         h2: [
//           {
//             h3: [
//               {
//                 h4: [
//                   {
//                     first: "Hello"
//                   }
//                 ]
//               }
//             ]
//           }
//         ]
//       },
//       {
//         first: "World - 2",
//         second: "30",
//         h2: [
//           {
//             first: 0
//           },
//           {
//             // first: 98,
//             h3: [
//               {
//                 first: 'Proverka',
//                 h4: [
//                   {
//                     first: "Da"
//                   }
//                 ]
//               }
//             ]
//           },
//           {
//             first: 97
//           },
//         ]
//       },
//       {
//         first: "Try",
//         second: "30",
//         h2: [
//           {
//             first: 1
//           },
//           {
//             first: 2
//           },
//           {
//             first: 3
//           },
//           {
//             first: 4
//           },
//         ]
//       }
//     ]
//   }
// };

const FormContainer = (props) => {
  const [formVisible, setFormVisible] = useState(true);

  const onOk = useCallback((data) => {
    console.log(data);
    // setFormVisible(false);
  }, []);

  const onCancel = useCallback(() => {
    // setFormVisible(false);
  }, []);


  if (!formVisible) return null;

  return <App config={config}
              value={value}
              onOk={onOk}
              onCancel={onCancel}
  />
};


ReactDOM.render(
  <React.StrictMode>
    <FormContainer/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();


