package org.golde.forge.scratchforge.mods;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.golde.forge.scratchforge.base.BlockBase;
import org.golde.forge.scratchforge.base.JavaHelpers;
import org.golde.forge.scratchforge.base.ModHelpers;
import org.golde.forge.scratchforge.base.PLog;

import com.google.common.collect.SetMultimap;

import cpw.mods.fml.client.FMLClientHandler;
import cpw.mods.fml.client.GuiConfirmation;
import cpw.mods.fml.common.FMLCommonHandler;
import cpw.mods.fml.common.Mod;
import cpw.mods.fml.common.Mod.EventHandler;
import cpw.mods.fml.common.StartupQuery;
import cpw.mods.fml.common.event.*;
import cpw.mods.fml.common.eventhandler.SubscribeEvent;
import cpw.mods.fml.common.gameevent.PlayerEvent;
import net.minecraft.client.Minecraft;
import net.minecraft.creativetab.CreativeTabs;
import net.minecraft.init.Items;
import net.minecraft.item.Item;
import net.minecraft.util.ChatComponentText;
import net.minecraft.util.EnumChatFormatting;
import net.minecraft.util.ResourceLocation;
import net.minecraftforge.client.event.GuiOpenEvent;
import net.minecraftforge.common.MinecraftForge;

@Mod(modid = Mod_scratchforge.MOD_ID, name=Mod_scratchforge.MOD_NAME, version="1.0")
public class Mod_scratchforge {
	public static final String MOD_NAME = "Scratch Forge";
	public static final String MOD_ID = "sf_" + MOD_NAME;
	public static final String BLOCK_ID = MOD_ID + ":";


	/*public static CreativeTabs CREATIVE_TAB = new CreativeTabs(MOD_NAME.replaceFirst(" ", "_")) {

		@Override
		public Item getTabIconItem() {
			return Items.iron_pickaxe;
		}

	};*/

	@EventHandler
	public void preInit(FMLPreInitializationEvent event) {
		//ModHelpers.addTranslation(CREATIVE_TAB.getTranslatedTabLabel(), MOD_NAME);

	}

	@EventHandler
	public void init(FMLInitializationEvent event) {
		MinecraftForge.EVENT_BUS.register(this);
		FMLCommonHandler.instance().bus().register(this);
	}

	@EventHandler
	public void postInit(FMLPostInitializationEvent event) {
		
	}

	@SubscribeEvent
	public void onPlayerLogin(PlayerEvent.PlayerLoggedInEvent event) {
		//Let people know that they are missing textures
		Set<String> failedTextures = new HashSet<String>();
		try {
			FMLClientHandler client = FMLClientHandler.instance();
			Class clazz = client.getClass();
			Field field = clazz.getDeclaredField("missingTextures");
			field.setAccessible(true);
			SetMultimap<String,ResourceLocation> map = (SetMultimap<String,ResourceLocation>)field.get(client);
			for(ResourceLocation s: map.values()) {
				failedTextures.add(s.getResourcePath().replace("textures/blocks/", "").replace(".png", "").replace("_", " "));
			}
		}
		catch(Exception e) {
			PLog.error(e, "Failed to do reflection!");
		}

		if(failedTextures.size() > 0) {
			String failed = ModHelpers.joinStrings(new ArrayList<String>(failedTextures), ", ", 0);
			ModHelpers.sendChatMessage(event.player, EnumChatFormatting.GOLD + "Hey! It seems like you do not have textures for "+ EnumChatFormatting.RESET + failed + EnumChatFormatting.GOLD + "." );
		}
	}
	
	@SubscribeEvent
	public void onGuiChange(GuiOpenEvent event) {

		//Remove the missing blocks message that forge puts
		//Kids might get confused so we will just remove it
		if(event.gui instanceof GuiConfirmation) {
			
			//Use reflection to automatically simulate pushing the OK button
			try {
				GuiConfirmation gui = (GuiConfirmation)event.gui;
				Class clazz = gui.getClass();
				Field field = JavaHelpers.getField(clazz, "query");
				field.setAccessible(true);
				StartupQuery query = (StartupQuery) field.get(gui);
				FMLClientHandler.instance().showGuiScreen(null);
	            query.setResult(true);
	            query.finish();
			}
			catch(Exception e) {
				PLog.error(e, "Failed to do reflection!");
			}
			event.gui = null; //Don't display the screen
		}
	}
	
}
