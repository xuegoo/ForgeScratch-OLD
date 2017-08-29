goog.require('Blockly.Blocks');



//Blockly.Blocks.colour.HUE = 20;

/*
Blockly.Blocks['name'] = {
  
  init: function() {
    this.jsonInit({
      
    });
  }
};

*/


Blockly.Blocks['mcblock'] = {
  
  init: function() {
    this.jsonInit({
      "type": "mcblock",
  "message0": "Minecraft Block %1 Name: %2 %3 Properties: %4 %5 Options %6 %7",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "field_input",
      "name": "NAME",
      "text": "change_me"
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "field_dropdown",
      "name": "MATERIAL",
      "options": [
        [
          "Dirt",
          "Material.ground"
        ],
        [
          "Stone",
          "Material.rock"
        ],
        [
          "Wood",
          "Material.wood"
        ],
        [
          "Glass",
          "Material.glass"
        ]
      ]
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "input_statement",
      "name": "Options",
      "check": "mcblockoptions"
    }
  ],
  "inputsInline": false,
  "colour": 315,
  "tooltip": "",
  "helpUrl": ""
    });
  }
};

function isJavaId(c)
{
  return c.match(/[a-zA-Z0-9]/i);
}

function make_java_id(name)
{
  var result = "";
  for (var i = 0; i < name.length; ++i) {
    var c = name.charAt(i);
    if (isJavaId(c)) {
      result = result + c;
    }
    else {
      result = result + "_";
    }
  }

  return result;
}


Blockly.Java['mcblock'] = function(block) {
  var value_name = make_java_id(block.getFieldValue('NAME'));
  var raw_value_name = block.getFieldValue('NAME');
  var dropdown_material = block.getFieldValue('MATERIAL');
  var statements_options = Blockly.Java.statementToCode(block, 'Options');
  // TODO: Assemble Java into code variable.
  var code = 
    '    public class Mcblock_' + value_name + ' extends BlockBase {\n' +
    '        public Mcblock_' + value_name + '() {\n' +
    '            super(BLOCK_ID, CREATIVE_TAB, "' + raw_value_name + '", ' + dropdown_material + '); \n' +
    '        }\n\n' +
          statements_options +
    '    }\n';

  return code;
};

Blockly.Blocks['mcblockoptions_quantity'] = {
  
  init: function() {
    this.jsonInit({
      "type": "mcblockoptions",
  "message0": "Amount: %1",
  "args0": [
    {
      "type": "input_value",
      "name": "AMOUNT",
      "check": "Number"
    }
  ],
  "previousStatement": "mcblockoptions",
  "nextStatement": "mcblockoptions",
  "colour": 330,
  "tooltip": "",
  "helpUrl": ""
    });
  }
};

Blockly.Java['mcblockoptions_quantity'] = function(block) {
  var value_amount = Blockly.Java.valueToCode(block, 'AMOUNT', Blockly.Java.ORDER_ATOMIC);
  var code = 
  '    @Override\n' + 
  '    public int quantityDropped(Random r){\n' +
  '        return Math.max(0,(int)' + value_amount + ');\n' + 
  '    }\n';
  return code;
};



Blockly.Blocks['mcblockoptions_lightopacity'] = {
  
  init: function() {
    this.jsonInit({
      "type": "mcblockoptions",
  "message0": "Light Opacity %1",
  "args0": [
    {
      "type": "input_value",
      "name": "LIGHT_OPACITY",
      "check": "Number"
    }
  ],
  "previousStatement": "mcblockoptions",
  "nextStatement": "mcblockoptions",
  "colour": 330,
  "tooltip": "",
  "helpUrl": ""
    });
  }
};

Blockly.Java['mcblockoptions_lightopacity'] = function(block) {
  var value_light_opacity = Blockly.Java.valueToCode(block, 'LIGHT_OPACITY', Blockly.Java.ORDER_ATOMIC);
  
  var code = 
  '    @Override\n' +
  '    public int getLightOpacity() {\n' +
  '        return Math.min(15, Math.max(0,(int)' + value_light_opacity + '));\n' +
  '    }\n';

  return code;
};



Blockly.Blocks['mcblockoptions_lightvalue'] = {
  
  init: function() {
    this.jsonInit({
      "type": "mcblockoptions",
  "message0": "Light Value %1",
  "args0": [
    {
      "type": "input_value",
      "name": "LIGHT_VALUE",
      "check": "Number"
    }
  ],
  "previousStatement": "mcblockoptions",
  "nextStatement": "mcblockoptions",
  "colour": 330,
  "tooltip": "",
  "helpUrl": ""
    });
  }
}; 

Blockly.Java['mcblockoptions_lightvalue'] = function(block) {
  var value_light_value  = Blockly.Java.valueToCode(block, 'LIGHT_VALUE', Blockly.Java.ORDER_ATOMIC);
  
  var code = 
  '    @Override\n' +
  '    public int getLightValue() {\n' +
  '        return Math.min(15, Math.max(0,(int)' + value_light_value  + '));\n' +
  '    }\n';

  return code;
};


Blockly.Blocks['mcblockoptions_click_right'] = {
  
  init: function() {
    this.jsonInit({
      "type": "mcblockoptions_click_right",
  "message0": "On Right Click %1 %2",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_statement",
      "name": "CODE",
      "check": "action"
    }
  ],
  "previousStatement": "mcblockoptions",
  "nextStatement": "mcblockoptions",
  "colour": 330,
  "tooltip": "",
  "helpUrl": ""
    });
  }
}; 

Blockly.Java['mcblockoptions_click_right'] = function(block) {
  var statements_code = Blockly.Java.statementToCode(block, 'CODE');
  
  var code = 
  '    @Override\n' +
  '    public boolean onBlockActivated(World world, int x, int y, int z, EntityPlayer player, int side, float hx, float hy, float hz) {\n' +
  '        ' + statements_code + '\n' +
  '        return true;\n' +
  '    }\n';
  return code;
};


Blockly.Blocks['mcblockoptions_click_left'] = {
  
  init: function() {
    this.jsonInit({
      "type": "mcblockoptions_click_left",
  "message0": "On Left Click %1 %2",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_statement",
      "name": "CODE",
      "check": "action"
    }
  ],
  "previousStatement": "mcblockoptions",
  "nextStatement": "mcblockoptions",
  "colour": 330,
  "tooltip": "",
  "helpUrl": ""
    });
  }
}; 

Blockly.Java['mcblockoptions_click_left'] = function(block) {
  var statements_code = Blockly.Java.statementToCode(block, 'CODE');
  
  var code = 
  '    @Override\n' +
  '    public void onBlockClicked(World world, int x, int y, int z, EntityPlayer player) {\n' +
  '        ' + statements_code + '\n' +
  '    }\n';
  return code;
};


Blockly.Blocks['mcblockoptions_blockplaced'] = {
  
  init: function() {
    this.jsonInit({
      "type": "mcblockoptions_blockplaced",
  "message0": "On Block Placed %1 %2",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_statement",
      "name": "CODE",
      "check": "action"
    }
  ],
  "previousStatement": "mcblockoptions",
  "nextStatement": "mcblockoptions",
  "colour": 330,
  "tooltip": "",
  "helpUrl": ""
    });
  }
}; 

Blockly.Java['mcblockoptions_blockplaced'] = function(block) {
  var statements_code = Blockly.Java.statementToCode(block, 'CODE');
  
  var code = 
  '    @Override\n' +
  '    public void onBlockPlacedBy(World world, int x, int y, int z, EntityLivingBase player, ItemStack itemstack) {\n' +
  '        ' + statements_code + '\n' +
  '    }\n';
  return code;
};



Blockly.Blocks['mcblockoptions_block_broken_player'] = {
  
  init: function() {
    this.jsonInit({
      "type": "mcblockoptions_block_broken_player",
  "message0": "On Block Mined %1 %2",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_statement",
      "name": "CODE",
      "check": "action"
    }
  ],
  "previousStatement": "mcblockoptions",
  "nextStatement": "mcblockoptions",
  "colour": 330,
  "tooltip": "",
  "helpUrl": ""
    });
  }
}; 

Blockly.Java['mcblockoptions_block_broken_player'] = function(block) {
  var statements_code = Blockly.Java.statementToCode(block, 'CODE');
  
  var code = 
  '    @Override\n' +
  '    public void onBlockHarvested(World world, int x, int y, int z, int meta, EntityPlayer player) {\n' +
  '        ' + statements_code + '\n' +
  '    }\n';
  return code;
};



Blockly.Blocks['mcblockoptions_block_broken_explosion'] = {
  
  init: function() {
    this.jsonInit({
      "type": "mcblockoptions_block_broken_explosion",
  "message0": "On Block Destroyed By Explosion %1 %2",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_statement",
      "name": "NAME",
      "check": "action"
    }
  ],
  "previousStatement": "mcblockoptions",
  "nextStatement": "mcblockoptions",
  "colour": 330,
  "tooltip": "",
  "helpUrl": ""
    });
  }
}; 

Blockly.Java['mcblockoptions_block_broken_explosion'] = function(block) {
  var statements_code = Blockly.Java.statementToCode(block, 'CODE');
  
  var code = 
  '    @Override\n' +
  '    public void onBlockDestroyedByExplosion(World world, int x, int y, int z, Explosion explosion) {\n' +
  '        ' + statements_code + '\n' +
  '    }\n';
  return code;
};



Blockly.Blocks['mcblockoptions_walkthrough'] = {
  
  init: function() {
    this.jsonInit({
      "type": "mcblockoptions",
  "message0": "On Block Walkthough %1 %2",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_statement",
      "name": "CODE"
    }
  ],
  "previousStatement": "mcblockoptions",
  "nextStatement": "mcblockoptions",
  "colour": 330,
  "tooltip": "",
  "helpUrl": ""
    });
  }
};

Blockly.Java['mcblockoptions_walkthrough'] = function(block) {
  var statements_code = Blockly.Java.statementToCode(block, 'CODE');
  
  var code = 
  '    @Override\n' +
  '    public void onEntityCollidedWithBlock(World world, int x, int y, int z, Entity entity) {\n' +
  '        ' + statements_code + '\n' +
  '    }\n' +
  '\n' +
  '    @Override\n' +
  '    public AxisAlignedBB getCollisionBoundingBoxFromPool(){return null;}\n' +
  '\n' +
  '    @Override\n' +
  '    public boolean renderAsNormalBlock(){return false;}\n'

  ;
  return code;
}; 


Blockly.Blocks['mcblockoptions_transparent'] = {
  
  init: function() {
    this.jsonInit({
      "type": "mcblockoptions",
  "message0": "Render Block Like Glass",
  "previousStatement": "mcblockoptions",
  "nextStatement": "mcblockoptions",
  "colour": 330,
  "tooltip": "",
  "helpUrl": ""
    });
  }
}; 

Blockly.Java['mcblockoptions_transparent'] = function(block) {
  var code = 
  '    @Override\n' +
  '    public boolean isOpaqueCube(){return false;}\n';
  return code;
};



Blockly.Blocks['mcblockoptions_experience'] = {
  
  init: function() {
    this.jsonInit({
      "type": "mcblockoptions",
  "message0": "Amount Of XP To Drop %1",
  "args0": [
    {
      "type": "input_value",
      "name": "AMOUNT",
      "check": "Number"
    }
  ],
  "previousStatement": "mcblockoptions",
  "nextStatement": "mcblockoptions",
  "colour": 330,
  "tooltip": "",
  "helpUrl": ""
    });
  }
}; 

Blockly.Java['mcblockoptions_experience'] = function(block) {
  var value_light_value  = Blockly.Java.valueToCode(block, 'AMOUNT', Blockly.Java.ORDER_ATOMIC);
  
  var code = 
  '    @Override\n' +
  '    public int getExpDrop() {\n' +
  '        return Math.max(0,(int)' + value_light_value  + ');\n' +
  '    }\n';

  return code;
};


Blockly.Blocks['mcaction_time_selector'] = {
  
  init: function() {
    this.jsonInit({
      "type": "mcaction_time_selector",
  "message0": "Set time to %1",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "time",
      "options": [
        [
          "Sunrise",
          "0"
        ],
        [
          "Day",
          "1000"
        ],
        [
          "Afternoon",
          "6000"
        ],
        [
          "Sunset",
          "12000"
        ],
        [
          "Night",
          "13000"
        ],
        [
          "Midnight",
          "18000"
        ]
      ]
    }
  ],
  "previousStatement": "action",
  "nextStatement": "action",
  "colour": 140,
  "tooltip": "",
  "helpUrl": ""
    });
  }
};

Blockly.Java['mcaction_time_selector'] = function(block) {
  var dropdown_time = block.getFieldValue('time');
  
  var code = 'world.setWorldTime(Math.max(0, (long)' + dropdown_time + '));';

  return code;
};


Blockly.Blocks['mcaction_time_raw'] = {
  
  init: function() {
    this.jsonInit({
      "type": "mcaction_time_raw",
  "message0": "Set time to %1",
  "args0": [
    {
      "type": "input_value",
      "name": "time",
      "check": "Number"
    }
  ],
  "previousStatement": "action",
  "nextStatement": "action",
  "colour": 140,
  "tooltip": "",
  "helpUrl": ""
    });
  }
};

Blockly.Java['mcaction_time_raw'] = function(block) {
  var value_time = Blockly.Java.valueToCode(block, 'time', Blockly.Java.ORDER_ATOMIC);
  
  var code = 'world.setWorldTime(Math.max(0, (long)' + value_time + '));';

  return code;
};



Blockly.Blocks['mcaction_spawn_mob'] = {
  
  init: function() {
    this.jsonInit({
      "type": "mcaction_spawn_mob",
  "message0": "Spawn Mob %1",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "MOB",
      "options": [
        [
          "Creeper",
          "Creeper"
        ],
        [
          "Skeleton",
          "Skeleton"
        ],
        [
          "Spider",
          "Spider"
        ],
        [
          "Giant",
          "Giant"
        ],
        [
          "Zombie",
          "Zombie"
        ],
        [
          "Slime",
          "Slime"
        ],
        [
          "Ghast",
          "Ghast"
        ],
        [
          "Zombie Pigman",
          "PigZombie"
        ],
        [
          "Enderman",
          "Enderman"
        ],
        [
          "Cave Spider",
          "CaveSpider"
        ],
        [
          "Silverfish",
          "Silverfish"
        ],
        [
          "Blaze",
          "Blaze"
        ],
        [
          " Lava Slime",
          "LavaSlime"
        ],
        [
          "Ender Dragon",
          "EnderDragon"
        ],
        [
          " Wither",
          "WitherBoss"
        ],
        [
          "Bat",
          "Bat"
        ],
        [
          "Pig",
          "Pig"
        ],
        [
          "Sheep",
          "Sheep"
        ],
        [
          "Cow",
          "Cow"
        ],
        [
          "Chicken",
          "Chicken"
        ],
        [
          "Squid",
          "Squid"
        ],
        [
          "Wolf",
          "Wolf"
        ],
        [
          "Mooshroom",
          "Mooshroom"
        ],
        [
          " Snow Man",
          "SnowMan"
        ],
        [
          "Cat",
          "Ozelot"
        ],
        [
          "Iron Golem",
          "VillagerGolem"
        ],
        [
          "Horse",
          "EntityHorse"
        ],
        [
          "Villager",
          "Villager"
        ]
      ]
    }
  ],
  "previousStatement": "action",
  "nextStatement": "action",
  "colour": 140,
  "tooltip": "",
  "helpUrl": ""
    });
  }
};

Blockly.Java['mcaction_spawn_mob'] = function(block) {
  var dropdown_mob = block.getFieldValue('MOB');

  var code = 'ModHelpers.spawnEntityInWorld(world, x, y, z, "' + dropdown_mob + '");\n';
  return code;
};

Blockly.Blocks['mcaction_explosion'] = {
  
  init: function() {
    this.jsonInit({
      "type": "mcaction_explosion",
  "message0": "Explosion %1 Power %2 Smoke %3 %4 Fire %5",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "POWER",
      "check": "Number"
    },
    {
      "type": "field_checkbox",
      "name": "SMOKE",
      "checked": true
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "field_checkbox",
      "name": "FIRE",
      "checked": false
    }
  ],
  "inputsInline": false,
  "previousStatement": "action",
  "nextStatement": "action",
  "colour": 140,
  "tooltip": "",
  "helpUrl": ""
    });
  }
};


Blockly.Java['mcaction_explosion'] = function(block) {
  var value_power = Blockly.Java.valueToCode(block, 'POWER', Blockly.Java.ORDER_ATOMIC);
  var checkbox_smoke = block.getFieldValue('SMOKE') == 'TRUE';
  var checkbox_fire = block.getFieldValue('FIRE') == 'TRUE';

  var code = 'world.newExplosion((Entity)null, x, y, z, ' + (value_power + 1) + ', ' + checkbox_fire + ', ' + checkbox_smoke + ');\n';
  return code;
};