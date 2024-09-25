import type { BlockMap } from '@/types/materials';

export const mockMaterial = (): BlockMap => {
  return {
    'cf1379bf-bf5a-41f9-942f-31dd4253c178': {
      value: {
        id: 'cf1379bf-bf5a-41f9-942f-31dd4253c178',
        type: 'page',
        properties: { title: [['Делайте хорошо, а не хорошо — не делайте']] },
        content: [
          '47763af6-c30a-45a8-b617-833745af577c',
          '600ea688-3afb-4ea7-82e6-12f32ba59492',
          'ae1b87f1-c717-4bc0-804b-beac5018776b',
          'cd1a6c9c-b59a-4650-9046-1d1c69a1d3d3',
          '46127a27-eec8-4f97-8171-f34d8558548a',
          '4371581b-fbbb-4ff6-8efd-92c2b198fb9c',
          'eb228267-20a4-4bc4-8fda-7304a128d0f3',
          'e0d7fbeb-50e9-4ddf-b5eb-1d2149d7a0fa',
          'd6c957fa-2167-4d86-b60d-38adc9f74f4a',
          '7c8eeb72-a1ba-4600-9845-a2e59f0f5259',
          '7a731045-50a1-4471-9b0a-e2bbfa2b801a',
          '67270ffa-bf19-46a5-8d45-85f41e0dd0de',
          '7178d293-65e3-4a9c-a7e0-d4feb3fc44d6',
          '0b258dfe-345f-4319-9744-ad5652dba80e',
          '6b814797-ca6d-4d86-8bf1-8454344e3721',
          '689bfdf5-9d06-4e01-b270-4a7218b66225',
          '58dd4440-578b-48bf-b962-b27bd4264868',
          'ce18938c-bc5c-45bc-94ff-759bdcb83218',
          'cf49e9e2-d92c-485a-bb3c-3ef1e65ab29b',
          '3047ea5c-d024-4005-bf16-c39436b25ebe',
          '068817fb-2f46-4fc4-9938-619220c8da40',
          '2a7b12a0-d707-4f31-9f28-99e98ee88e30',
          'fdaf4f4a-39c9-43a7-8541-126cbb0c1380',
          '63e671a1-38b8-4dc7-8177-0ba5be082410',
          '227c1f36-fc4a-41a5-985d-635185d405ef',
          'f02b2733-477b-41f1-ad94-48aa7b1e3e52',
          '94ef042c-1577-42f4-bf43-64309096ae84',
          '0ed3dc21-8803-4e5f-a0da-58d6826fbcb2',
          '5a8435bc-9c4b-480e-8089-61f125e0285e',
        ],
        format: {
          page_icon: '🚁',
          page_cover:
            'https://images.unsplash.com/photo-1695653422699-de49031f060e?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb',
          page_cover_position: 0.5,
        },
        parent_id: 'ee9dcbdc-dbd0-4e57-95f0-c256fbb86b08',
        parent_table: 'block',
      },
    },
    '47763af6-c30a-45a8-b617-833745af577c': {
      value: {
        id: '47763af6-c30a-45a8-b617-833745af577c',
        type: 'table_of_contents',
        format: {
          block_color: 'gray',
          copied_from_pointer: {
            id: '76df17d9-7cdc-4350-93fa-46729973fa5e',
            table: 'block',
            spaceId: '42cb2fe6-5e2d-45ff-b057-1430773db711',
          },
        },
        parent_id: 'cf1379bf-bf5a-41f9-942f-31dd4253c178',
        parent_table: 'block',
      },
    },
    '600ea688-3afb-4ea7-82e6-12f32ba59492': {
      value: {
        id: '600ea688-3afb-4ea7-82e6-12f32ba59492',
        type: 'text',
        properties: {
          title: [
            [
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eu tortor quis odio sagittis vestibulum. In in cursus felis. Ut tellus magna, vestibulum sed congue in, scelerisque ac ipsum. In blandit vulputate varius. Suspendisse tempus vulputate sem sed fermentum. Ut ante lectus, suscipit at mauris et, convallis porta nunc. Praesent aliquet vehicula facilisis. Donec ullamcorper tristique nulla. In hac habitasse platea dictumst. Etiam quis gravida enim. Proin rutrum velit vulputate, imperdiet dui eget, ornare leo. Fusce vitae dui velit. Vestibulum aliquam libero in massa scelerisque luctus.',
            ],
          ],
        },
        format: {
          copied_from_pointer: {
            id: '6d0f9ed3-b00d-425b-9b0e-23df808f4adb',
            table: 'block',
            spaceId: '42cb2fe6-5e2d-45ff-b057-1430773db711',
          },
        },
        parent_id: 'cf1379bf-bf5a-41f9-942f-31dd4253c178',
        parent_table: 'block',
      },
    },
    'ae1b87f1-c717-4bc0-804b-beac5018776b': {
      value: {
        id: 'ae1b87f1-c717-4bc0-804b-beac5018776b',
        type: 'text',
        parent_id: 'cf1379bf-bf5a-41f9-942f-31dd4253c178',
        parent_table: 'block',
      },
    },
    'cd1a6c9c-b59a-4650-9046-1d1c69a1d3d3': {
      value: {
        id: 'cd1a6c9c-b59a-4650-9046-1d1c69a1d3d3',
        type: 'text',
        properties: {
          title: [
            [
              'Link to last paragraph',
              [
                [
                  'a',
                  '/cf1379bfbf5a41f9942f31dd4253c178#5a8435bc9c4b480e808961f125e0285e',
                ],
              ],
            ],
          ],
        },
        parent_id: 'cf1379bf-bf5a-41f9-942f-31dd4253c178',
        parent_table: 'block',
      },
    },
    '46127a27-eec8-4f97-8171-f34d8558548a': {
      value: {
        id: '46127a27-eec8-4f97-8171-f34d8558548a',
        type: 'header',
        properties: { title: [['Heading 1']] },
        format: {
          copied_from_pointer: {
            id: 'ea55fa78-52aa-4386-9df2-bcaeac390a0e',
            table: 'block',
            spaceId: '42cb2fe6-5e2d-45ff-b057-1430773db711',
          },
        },
        parent_id: 'cf1379bf-bf5a-41f9-942f-31dd4253c178',
        parent_table: 'block',
      },
    },
    '4371581b-fbbb-4ff6-8efd-92c2b198fb9c': {
      value: {
        id: '4371581b-fbbb-4ff6-8efd-92c2b198fb9c',
        type: 'sub_header',
        properties: { title: [['Heading 2']] },
        format: {
          copied_from_pointer: {
            id: '1435e012-9e93-4938-b5a8-171de3f94ba9',
            table: 'block',
            spaceId: '42cb2fe6-5e2d-45ff-b057-1430773db711',
          },
        },
        parent_id: 'cf1379bf-bf5a-41f9-942f-31dd4253c178',
        parent_table: 'block',
      },
    },
    'eb228267-20a4-4bc4-8fda-7304a128d0f3': {
      value: {
        id: 'eb228267-20a4-4bc4-8fda-7304a128d0f3',
        type: 'sub_sub_header',
        properties: { title: [['Heading 3']] },
        format: {
          copied_from_pointer: {
            id: 'd0a16bdc-d4ab-4ce1-91ab-c92a23de559e',
            table: 'block',
            spaceId: '42cb2fe6-5e2d-45ff-b057-1430773db711',
          },
        },
        parent_id: 'cf1379bf-bf5a-41f9-942f-31dd4253c178',
        parent_table: 'block',
      },
    },
    'e0d7fbeb-50e9-4ddf-b5eb-1d2149d7a0fa': {
      value: {
        id: 'e0d7fbeb-50e9-4ddf-b5eb-1d2149d7a0fa',
        type: 'header',
        properties: { title: [['Again 1']] },
        parent_id: 'cf1379bf-bf5a-41f9-942f-31dd4253c178',
        parent_table: 'block',
      },
    },
    'd6c957fa-2167-4d86-b60d-38adc9f74f4a': {
      value: {
        id: 'd6c957fa-2167-4d86-b60d-38adc9f74f4a',
        type: 'sub_sub_header',
        properties: { title: [['But next is 3']] },
        parent_id: 'cf1379bf-bf5a-41f9-942f-31dd4253c178',
        parent_table: 'block',
      },
    },
    '7c8eeb72-a1ba-4600-9845-a2e59f0f5259': {
      value: {
        id: '7c8eeb72-a1ba-4600-9845-a2e59f0f5259',
        type: 'sub_header',
        properties: { title: [['Then comes 2']] },
        parent_id: 'cf1379bf-bf5a-41f9-942f-31dd4253c178',
        parent_table: 'block',
      },
    },
    '7a731045-50a1-4471-9b0a-e2bbfa2b801a': {
      value: {
        id: '7a731045-50a1-4471-9b0a-e2bbfa2b801a',
        type: 'header',
        properties: { title: [['And again 1']] },
        parent_id: 'cf1379bf-bf5a-41f9-942f-31dd4253c178',
        parent_table: 'block',
      },
    },
    '67270ffa-bf19-46a5-8d45-85f41e0dd0de': {
      value: {
        id: '67270ffa-bf19-46a5-8d45-85f41e0dd0de',
        type: 'image',
        properties: {
          size: [['26.2KB']],
          title: [['1080px-Full_moon_partially_obscured_by_atmosphere.jpg']],
          source: [
            [
              'https://cdn.tough-dev.school/assets/2a4930fa-0f57-4732-8629-ea4ad496f1b8.jpg',
            ],
          ],
          caption: [['This is moon']],
        },
        format: {
          block_width: 1080,
          display_source:
            'https://s3-us-west-2.amazonaws.com/secure.notion-static.com/a26dc863-571f-4984-a577-7f09f9b74d6c/1080px-Full_moon_partially_obscured_by_atmosphere.jpg',
          block_full_width: false,
          block_page_width: true,
          block_aspect_ratio: 0.6666666666666666,
          copied_from_pointer: {
            id: 'f37e3833-d055-4cb1-a0c8-82ef8fb7b1aa',
            table: 'block',
            spaceId: '42cb2fe6-5e2d-45ff-b057-1430773db711',
          },
          block_preserve_scale: true,
        },
        parent_id: 'cf1379bf-bf5a-41f9-942f-31dd4253c178',
        parent_table: 'block',
      },
    },
    '7178d293-65e3-4a9c-a7e0-d4feb3fc44d6': {
      value: {
        id: '7178d293-65e3-4a9c-a7e0-d4feb3fc44d6',
        type: 'bulleted_list',
        properties: { title: [['Option 1']] },
        format: {
          copied_from_pointer: {
            id: 'e90cf348-0d84-4067-9c74-3593f3a365e9',
            table: 'block',
            spaceId: '42cb2fe6-5e2d-45ff-b057-1430773db711',
          },
        },
        parent_id: 'cf1379bf-bf5a-41f9-942f-31dd4253c178',
        parent_table: 'block',
      },
    },
    '0b258dfe-345f-4319-9744-ad5652dba80e': {
      value: {
        id: '0b258dfe-345f-4319-9744-ad5652dba80e',
        type: 'bulleted_list',
        properties: { title: [['Option 2']] },
        format: {
          copied_from_pointer: {
            id: '691e8796-b863-4104-bf5a-79bb85c0e289',
            table: 'block',
            spaceId: '42cb2fe6-5e2d-45ff-b057-1430773db711',
          },
        },
        parent_id: 'cf1379bf-bf5a-41f9-942f-31dd4253c178',
        parent_table: 'block',
      },
    },
    '6b814797-ca6d-4d86-8bf1-8454344e3721': {
      value: {
        id: '6b814797-ca6d-4d86-8bf1-8454344e3721',
        type: 'bulleted_list',
        properties: { title: [['Option 3']] },
        format: {
          copied_from_pointer: {
            id: 'aeef0c29-aa95-4038-bd76-d38c962451c0',
            table: 'block',
            spaceId: '42cb2fe6-5e2d-45ff-b057-1430773db711',
          },
        },
        parent_id: 'cf1379bf-bf5a-41f9-942f-31dd4253c178',
        parent_table: 'block',
      },
    },
    '689bfdf5-9d06-4e01-b270-4a7218b66225': {
      value: {
        id: '689bfdf5-9d06-4e01-b270-4a7218b66225',
        type: 'numbered_list',
        properties: { title: [['Option 1']] },
        format: {
          copied_from_pointer: {
            id: 'fe342ace-2371-40fc-871c-c96d12862ec5',
            table: 'block',
            spaceId: '42cb2fe6-5e2d-45ff-b057-1430773db711',
          },
        },
        parent_id: 'cf1379bf-bf5a-41f9-942f-31dd4253c178',
        parent_table: 'block',
      },
    },
    '58dd4440-578b-48bf-b962-b27bd4264868': {
      value: {
        id: '58dd4440-578b-48bf-b962-b27bd4264868',
        type: 'numbered_list',
        properties: { title: [['Option 2']] },
        format: {
          copied_from_pointer: {
            id: '418735e9-9ecc-4bad-b3d7-b5b0d263f310',
            table: 'block',
            spaceId: '42cb2fe6-5e2d-45ff-b057-1430773db711',
          },
        },
        parent_id: 'cf1379bf-bf5a-41f9-942f-31dd4253c178',
        parent_table: 'block',
      },
    },
    'ce18938c-bc5c-45bc-94ff-759bdcb83218': {
      value: {
        id: 'ce18938c-bc5c-45bc-94ff-759bdcb83218',
        type: 'numbered_list',
        properties: { title: [['Option 3']] },
        format: {
          copied_from_pointer: {
            id: '6c7975ac-6e14-4046-a411-3221d9ab7089',
            table: 'block',
            spaceId: '42cb2fe6-5e2d-45ff-b057-1430773db711',
          },
        },
        parent_id: 'cf1379bf-bf5a-41f9-942f-31dd4253c178',
        parent_table: 'block',
      },
    },
    'cf49e9e2-d92c-485a-bb3c-3ef1e65ab29b': {
      value: {
        id: 'cf49e9e2-d92c-485a-bb3c-3ef1e65ab29b',
        type: 'quote',
        properties: {
          title: [
            [
              'Phasellus id eleifend turpis, ac blandit libero. Duis at nisi in massa laoreet molestie vel in quam. Mauris id purus suscipit, interdum purus gravida, commodo elit. Sed dapibus tincidunt leo vitae mollis. Mauris ac facilisis diam, vel pretium ante. Vivamus sodales tortor neque, et vulputate eros varius eget. Nam venenatis dolor vel egestas vestibulum. Nam luctus neque quis tristique tristique. Fusce ultrices varius urna, vel pretium libero ultricies ac. Ut nec erat non nibh commodo sollicitudin. Nulla ac tortor vitae lacus venenatis consequat. In vel dictum ante. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nam ullamcorper est vel enim fermentum, nec venenatis nisi ornare. Duis vehicula est nibh.',
            ],
          ],
        },
        format: {
          copied_from_pointer: {
            id: 'e7a24842-0ba7-4826-9494-f0adaf274f95',
            table: 'block',
            spaceId: '42cb2fe6-5e2d-45ff-b057-1430773db711',
          },
        },
        parent_id: 'cf1379bf-bf5a-41f9-942f-31dd4253c178',
        parent_table: 'block',
      },
    },
    '3047ea5c-d024-4005-bf16-c39436b25ebe': {
      value: {
        id: '3047ea5c-d024-4005-bf16-c39436b25ebe',
        type: 'callout',
        properties: {
          title: [
            [
              'Phasellus id eleifend turpis, ac blandit libero. Duis at nisi in massa laoreet molestie vel in quam. Mauris id purus suscipit, interdum purus gravida, commodo elit. \nSed dapibus tincidunt leo vitae mollis.',
            ],
          ],
        },
        format: {
          page_icon: '💡',
          block_color: 'gray_background',
          copied_from_pointer: {
            id: '9eb7babb-0216-4605-b505-407a7e0e1fde',
            table: 'block',
            spaceId: '42cb2fe6-5e2d-45ff-b057-1430773db711',
          },
        },
        parent_id: 'cf1379bf-bf5a-41f9-942f-31dd4253c178',
        parent_table: 'block',
      },
    },
    '068817fb-2f46-4fc4-9938-619220c8da40': {
      value: {
        id: '068817fb-2f46-4fc4-9938-619220c8da40',
        type: 'callout',
        properties: { title: [['Hi']] },
        content: [
          'fcaf1f7b-eed5-4500-9b43-84d28348a523',
          '2f95ed33-66c1-4176-b768-52d6cbdbe99e',
          'cd68d52d-bbc2-4e07-845c-dc2547534058',
        ],
        format: { page_icon: '3️⃣', block_color: 'gray_background' },
        parent_id: 'cf1379bf-bf5a-41f9-942f-31dd4253c178',
        parent_table: 'block',
      },
    },
    'fcaf1f7b-eed5-4500-9b43-84d28348a523': {
      value: {
        id: 'fcaf1f7b-eed5-4500-9b43-84d28348a523',
        type: 'text',
        properties: {
          title: [
            [
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ac magna id metus tempus volutpat vel non ligula. Nulla efficitur sapien quis orci auctor maximus. Fusce tristique nisi sed libero porttitor hendrerit. Proin consectetur ante eu sem tristique vestibulum non et mauris. Proin id consequat dolor. Nam finibus, odio vitae finibus sodales, turpis nunc dictum turpis, non mollis eros ante ac dui. Etiam non egestas augue. Phasellus pharetra eu tellus non consectetur. Phasellus ullamcorper massa id metus tempus, vitae pretium lacus tempus. Duis vehicula mi ut finibus dapibus. Curabitur commodo fringilla tellus, molestie consequat purus lacinia at. Ut pellentesque diam at ante fermentum vehicula. Fusce sodales quis tellus ac elementum.',
            ],
          ],
        },
        parent_id: '068817fb-2f46-4fc4-9938-619220c8da40',
        parent_table: 'block',
      },
    },
    '2f95ed33-66c1-4176-b768-52d6cbdbe99e': {
      value: {
        id: '2f95ed33-66c1-4176-b768-52d6cbdbe99e',
        type: 'text',
        properties: {
          title: [
            [
              'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Fusce eu justo augue. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam fringilla orci nec egestas vehicula. Donec quis velit diam. Nulla euismod aliquam nibh, vitae rutrum libero fermentum id. Quisque ultrices faucibus odio et faucibus. Sed tristique laoreet rhoncus. Phasellus eget leo nec quam hendrerit ornare vel a augue. Quisque dapibus sed purus quis consequat. Mauris a molestie odio. Ut nec tempus risus, vel suscipit augue.',
            ],
          ],
        },
        parent_id: '068817fb-2f46-4fc4-9938-619220c8da40',
        parent_table: 'block',
      },
    },
    'cd68d52d-bbc2-4e07-845c-dc2547534058': {
      value: {
        id: 'cd68d52d-bbc2-4e07-845c-dc2547534058',
        type: 'text',
        properties: {
          title: [
            [
              'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In aliquet, sapien vitae efficitur molestie, nunc tellus scelerisque neque, vitae elementum urna felis eu neque. Donec semper dictum fermentum. Phasellus varius, justo a facilisis eleifend, mauris orci tincidunt eros, ut vulputate purus metus quis quam. Curabitur hendrerit facilisis enim sed faucibus. Aenean vel neque sed dui gravida lobortis eu a mauris. Fusce suscipit mauris sed ultricies rhoncus. Quisque ut sapien at orci rutrum gravida sit amet eget enim.',
            ],
          ],
        },
        parent_id: '068817fb-2f46-4fc4-9938-619220c8da40',
        parent_table: 'block',
      },
    },
    '2a7b12a0-d707-4f31-9f28-99e98ee88e30': {
      value: {
        id: '2a7b12a0-d707-4f31-9f28-99e98ee88e30',
        type: 'column_list',
        content: [
          'bd714e51-0be6-46c1-8a7f-1c47c62906aa',
          'ce74846c-7487-4641-a50e-78ef0e7ae6bf',
          '32c694b5-27a6-4ae4-9f36-33f18ee7ba70',
        ],
        format: {
          copied_from_pointer: {
            id: 'dec6ffd3-46bf-49f6-8846-14fc7cd9beb6',
            table: 'block',
            spaceId: '42cb2fe6-5e2d-45ff-b057-1430773db711',
          },
        },
        parent_id: 'cf1379bf-bf5a-41f9-942f-31dd4253c178',
        parent_table: 'block',
      },
    },
    'bd714e51-0be6-46c1-8a7f-1c47c62906aa': {
      value: {
        id: 'bd714e51-0be6-46c1-8a7f-1c47c62906aa',
        type: 'column',
        content: ['8c9fa12d-f740-482f-b9b7-404ae3438976'],
        format: {
          column_ratio: 0.33333333333333337,
          copied_from_pointer: {
            id: '6cbfa93c-66e1-44cf-91c3-af03e11f0446',
            table: 'block',
            spaceId: '42cb2fe6-5e2d-45ff-b057-1430773db711',
          },
        },
        parent_id: '2a7b12a0-d707-4f31-9f28-99e98ee88e30',
        parent_table: 'block',
      },
    },
    'ce74846c-7487-4641-a50e-78ef0e7ae6bf': {
      value: {
        id: 'ce74846c-7487-4641-a50e-78ef0e7ae6bf',
        type: 'column',
        content: ['115efa0c-7784-4b94-bc4a-54fca32b0de1'],
        format: {
          column_ratio: 0.33333333333333337,
          copied_from_pointer: {
            id: '7436ea94-592d-4684-baf5-ba137d9bce30',
            table: 'block',
            spaceId: '42cb2fe6-5e2d-45ff-b057-1430773db711',
          },
        },
        parent_id: '2a7b12a0-d707-4f31-9f28-99e98ee88e30',
        parent_table: 'block',
      },
    },
    '32c694b5-27a6-4ae4-9f36-33f18ee7ba70': {
      value: {
        id: '32c694b5-27a6-4ae4-9f36-33f18ee7ba70',
        type: 'column',
        content: ['a5d62009-6b92-42c8-9c3a-780c6db4655e'],
        format: {
          column_ratio: 0.3333333333333333,
          copied_from_pointer: {
            id: 'a22c34c2-36f2-4894-9a5e-f22df3ff8a2f',
            table: 'block',
            spaceId: '42cb2fe6-5e2d-45ff-b057-1430773db711',
          },
        },
        parent_id: '2a7b12a0-d707-4f31-9f28-99e98ee88e30',
        parent_table: 'block',
      },
    },
    '8c9fa12d-f740-482f-b9b7-404ae3438976': {
      value: {
        id: '8c9fa12d-f740-482f-b9b7-404ae3438976',
        type: 'text',
        properties: {
          title: [
            [
              'Phasellus id eleifend turpis, ac blandit libero. Duis at nisi in massa laoreet molestie vel in quam. Mauris id purus suscipit, interdum purus gravida, commodo elit. Sed dapibus tincidunt leo vitae mollis. Mauris ac facilisis diam, vel pretium ante. Vivamus sodales tortor neque, et vulputate eros varius eget. Nam venenatis dolor vel egestas vestibulum. Nam luctus neque quis tristique tristique. Fusce ultrices varius urna, vel pretium libero ultricies ac. Ut nec erat non nibh commodo sollicitudin. Nulla ac tortor vitae lacus venenatis consequat. In vel dictum ante. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nam ullamcorper est vel enim fermentum, nec venenatis nisi ornare. Duis vehicula est nibh.',
            ],
          ],
        },
        format: {
          copied_from_pointer: {
            id: '6a2d4920-8121-4b4b-950f-0d71ebb20dd8',
            table: 'block',
            spaceId: '42cb2fe6-5e2d-45ff-b057-1430773db711',
          },
        },
        parent_id: 'bd714e51-0be6-46c1-8a7f-1c47c62906aa',
        parent_table: 'block',
      },
    },
    '115efa0c-7784-4b94-bc4a-54fca32b0de1': {
      value: {
        id: '115efa0c-7784-4b94-bc4a-54fca32b0de1',
        type: 'text',
        properties: {
          title: [
            [
              'Phasellus id eleifend turpis, ac blandit libero. Duis at nisi in massa laoreet molestie vel in quam. Mauris id purus suscipit, interdum purus gravida, commodo elit. Sed dapibus tincidunt leo vitae mollis. Mauris ac facilisis diam, vel pretium ante. Vivamus sodales tortor neque, et vulputate eros varius eget. Nam venenatis dolor vel egestas vestibulum. Nam luctus neque quis tristique tristique. Fusce ultrices varius urna, vel pretium libero ultricies ac. Ut nec erat non nibh commodo sollicitudin. Nulla ac tortor vitae lacus venenatis consequat. In vel dictum ante. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nam ullamcorper est vel enim fermentum, nec venenatis nisi ornare. Duis vehicula est nibh.',
            ],
          ],
        },
        format: {
          copied_from_pointer: {
            id: '60a52b2a-c542-4888-8735-2e08c10941d3',
            table: 'block',
            spaceId: '42cb2fe6-5e2d-45ff-b057-1430773db711',
          },
        },
        parent_id: 'ce74846c-7487-4641-a50e-78ef0e7ae6bf',
        parent_table: 'block',
      },
    },
    'a5d62009-6b92-42c8-9c3a-780c6db4655e': {
      value: {
        id: 'a5d62009-6b92-42c8-9c3a-780c6db4655e',
        type: 'text',
        properties: {
          title: [
            [
              'Phasellus id eleifend turpis, ac blandit libero. Duis at nisi in massa laoreet molestie vel in quam. Mauris id purus suscipit, interdum purus gravida, commodo elit. Sed dapibus tincidunt leo vitae mollis. Mauris ac facilisis diam, vel pretium ante. Vivamus sodales tortor neque, et vulputate eros varius eget. Nam venenatis dolor vel egestas vestibulum. Nam luctus neque quis tristique tristique. Fusce ultrices varius urna, vel pretium libero ultricies ac. Ut nec erat non nibh commodo sollicitudin. Nulla ac tortor vitae lacus venenatis consequat. In vel dictum ante. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nam ullamcorper est vel enim fermentum, nec venenatis nisi ornare. Duis vehicula est nibh.',
            ],
          ],
        },
        format: {
          copied_from_pointer: {
            id: '46341cf6-2641-480f-ae2a-2d9236d35f26',
            table: 'block',
            spaceId: '42cb2fe6-5e2d-45ff-b057-1430773db711',
          },
        },
        parent_id: '32c694b5-27a6-4ae4-9f36-33f18ee7ba70',
        parent_table: 'block',
      },
    },
    'fdaf4f4a-39c9-43a7-8541-126cbb0c1380': {
      value: {
        id: 'fdaf4f4a-39c9-43a7-8541-126cbb0c1380',
        type: 'divider',
        format: {
          copied_from_pointer: {
            id: 'b2fb451f-b894-433a-9dd9-41d40dbbafed',
            table: 'block',
            spaceId: '42cb2fe6-5e2d-45ff-b057-1430773db711',
          },
        },
        parent_id: 'cf1379bf-bf5a-41f9-942f-31dd4253c178',
        parent_table: 'block',
      },
    },
    '63e671a1-38b8-4dc7-8177-0ba5be082410': {
      value: {
        id: '63e671a1-38b8-4dc7-8177-0ba5be082410',
        type: 'bookmark',
        properties: {
          link: [['https://www.wikipedia.org/']],
          title: [['Wikipedia']],
          description: [
            [
              'Wikipedia is a free online encyclopedia, created and edited by volunteers around the world and hosted by the Wikimedia Foundation.',
            ],
          ],
        },
        format: {
          bookmark_icon:
            'https://www.wikipedia.org/static/favicon/wikipedia.ico',
          bookmark_cover:
            'https://www.wikipedia.org/portal/wikipedia.org/assets/img/Wikipedia-logo-v2.png',
          copied_from_pointer: {
            id: '3a674cd8-ae6b-4355-81d1-d6ef72f480b8',
            table: 'block',
            spaceId: '42cb2fe6-5e2d-45ff-b057-1430773db711',
          },
        },
        parent_id: 'cf1379bf-bf5a-41f9-942f-31dd4253c178',
        parent_table: 'block',
      },
    },
    '227c1f36-fc4a-41a5-985d-635185d405ef': {
      value: {
        id: '227c1f36-fc4a-41a5-985d-635185d405ef',
        type: 'text',
        properties: {
          title: [
            [
              '‣',
              [
                [
                  'p',
                  '8de1e9a2-d30e-4a84-a1ef-a9a36a1bd913',
                  '42cb2fe6-5e2d-45ff-b057-1430773db711',
                ],
              ],
            ],
            [' '],
          ],
        },
        format: {
          copied_from_pointer: {
            id: '9ab5d1a8-1be0-4b90-be33-b5bd6d774402',
            table: 'block',
            spaceId: '42cb2fe6-5e2d-45ff-b057-1430773db711',
          },
        },
        parent_id: 'cf1379bf-bf5a-41f9-942f-31dd4253c178',
        parent_table: 'block',
      },
    },
    'f02b2733-477b-41f1-ad94-48aa7b1e3e52': {
      value: {
        id: 'f02b2733-477b-41f1-ad94-48aa7b1e3e52',
        type: 'code',
        properties: {
          title: [["console.log('Hello World!')"]],
          language: [['JavaScript']],
        },
        format: {
          copied_from_pointer: {
            id: '6056e559-cb97-4c47-b4cb-357f7cacb403',
            table: 'block',
            spaceId: '42cb2fe6-5e2d-45ff-b057-1430773db711',
          },
        },
        parent_id: 'cf1379bf-bf5a-41f9-942f-31dd4253c178',
        parent_table: 'block',
      },
    },
    '94ef042c-1577-42f4-bf43-64309096ae84': {
      value: {
        id: '94ef042c-1577-42f4-bf43-64309096ae84',
        type: 'text',
        properties: { title: [['⁍', [['e', 'E = mc^2']]]] },
        format: {
          copied_from_pointer: {
            id: 'b2751cdb-5da0-476b-a1c5-f474ba13395b',
            table: 'block',
            spaceId: '42cb2fe6-5e2d-45ff-b057-1430773db711',
          },
        },
        parent_id: 'cf1379bf-bf5a-41f9-942f-31dd4253c178',
        parent_table: 'block',
      },
    },
    '0ed3dc21-8803-4e5f-a0da-58d6826fbcb2': {
      value: {
        id: '0ed3dc21-8803-4e5f-a0da-58d6826fbcb2',
        type: 'table',
        content: [
          '9fc9941c-75e1-4682-ad9c-c7fc037fc623',
          'c3d6ac8b-14c7-4010-ac31-1af2ff8942a5',
          'd59d7794-c861-4b9d-83f7-59d281c00705',
        ],
        format: {
          copied_from_pointer: {
            id: 'd88a4c68-dd5b-4fcb-804f-ec2e1b3d0551',
            table: 'block',
            spaceId: '42cb2fe6-5e2d-45ff-b057-1430773db711',
          },
          table_block_column_order: ['vZw{', 'I_^}', 'vs@i'],
          table_block_column_format: {
            'I_^}': { width: 232.66666666666666 },
            'vZw{': { width: 232.66666666666666 },
            'vs@i': { width: 232.66666666666666 },
          },
          table_block_column_header: true,
        },
        parent_id: 'cf1379bf-bf5a-41f9-942f-31dd4253c178',
        parent_table: 'block',
      },
    },
    '9fc9941c-75e1-4682-ad9c-c7fc037fc623': {
      value: {
        id: '9fc9941c-75e1-4682-ad9c-c7fc037fc623',
        type: 'table_row',
        properties: { 'I_^}': [['foo']], 'vs@i': [['bar']] },
        format: {
          copied_from_pointer: {
            id: '0ba911ab-ce5b-4c88-95ca-eb058ca4e67b',
            table: 'block',
            spaceId: '42cb2fe6-5e2d-45ff-b057-1430773db711',
          },
        },
        parent_id: '0ed3dc21-8803-4e5f-a0da-58d6826fbcb2',
        parent_table: 'block',
      },
    },
    'c3d6ac8b-14c7-4010-ac31-1af2ff8942a5': {
      value: {
        id: 'c3d6ac8b-14c7-4010-ac31-1af2ff8942a5',
        type: 'table_row',
        properties: {
          'I_^}': [['foofoo']],
          'vZw{': [['foo']],
          'vs@i': [['foobar']],
        },
        format: {
          copied_from_pointer: {
            id: 'b8714a0b-25a1-4ee7-880a-fe75dc408888',
            table: 'block',
            spaceId: '42cb2fe6-5e2d-45ff-b057-1430773db711',
          },
        },
        parent_id: '0ed3dc21-8803-4e5f-a0da-58d6826fbcb2',
        parent_table: 'block',
      },
    },
    'd59d7794-c861-4b9d-83f7-59d281c00705': {
      value: {
        id: 'd59d7794-c861-4b9d-83f7-59d281c00705',
        type: 'table_row',
        properties: {
          'I_^}': [['barfoo']],
          'vZw{': [['bar']],
          'vs@i': [['barbar']],
        },
        format: {
          copied_from_pointer: {
            id: 'c6bdc7ae-7543-48df-9dc1-f53a13928891',
            table: 'block',
            spaceId: '42cb2fe6-5e2d-45ff-b057-1430773db711',
          },
        },
        parent_id: '0ed3dc21-8803-4e5f-a0da-58d6826fbcb2',
        parent_table: 'block',
      },
    },
    '5a8435bc-9c4b-480e-8089-61f125e0285e': {
      value: {
        id: '5a8435bc-9c4b-480e-8089-61f125e0285e',
        type: 'text',
        properties: { title: [['Last paragraph']] },
        parent_id: 'cf1379bf-bf5a-41f9-942f-31dd4253c178',
        parent_table: 'block',
      },
    },
  };
};
