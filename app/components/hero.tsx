"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useEffect, useRef, useState } from "react"
import { FileText } from 'lucide-react'; // Using FileText as an example icon

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const [isMuted, setIsMuted] = useState(true)
  const [showModal, setShowModal] = useState(false) // 新增：控制弹框显示状态

  const videoUrls = [
    "video/s3.mp4",
    "video/s6.mp4",
    "video/s5.mp4",
    "video/s4.mp4"
  ]
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.error("Video autoplay failed:", error)
      })
  
      const handleVideoEnd = () => {
        let newIndex
        do {
          newIndex = Math.floor(Math.random() * videoUrls.length)
        } while (videoUrls.length > 1 && newIndex === currentVideoIndex)
        setCurrentVideoIndex(newIndex)
      }
  
      videoRef.current.addEventListener("ended", handleVideoEnd)
  
      return () => {
        if (videoRef.current) {
          videoRef.current.removeEventListener("ended", handleVideoEnd)
        }
      }
    }
  }, [currentVideoIndex])

  const toggleSound = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted
      setIsMuted(!isMuted)
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 p-4">
       <div className="absolute top-4 left-4 z-30">
        {/* Glassmorphism Button (now inside the positioned div) */}
        <button
          // Attach the click handler to manage modal visibility
          onClick={() => setShowModal(true)}
          // Styling using Tailwind CSS classes
          className="
            flex items-center gap-2          peça (layout: flexbox, center items, gap)
            rounded-lg                      peça (shape: rounded corners)
            border border-white/30         peça (border: white with 30% opacity)
            bg-white/10                    peça (background: white with 10% opacity)
            px-4 py-2                      peça (spacing: padding horizontal and vertical)
            text-white                     peça (typography: white text color)
            backdrop-blur-md               peça (effect: background blur)
            shadow-lg                      peça (effect: large shadow)
            transition duration-300 ease-in-out peça (animation: smooth transition on hover/focus)
            hover:bg-white/20              peça (interaction: background change on hover)
            hover:shadow-xl                peça (interaction: increased shadow on hover)
            focus:outline-none             peça (accessibility: remove default focus outline)
            focus:ring-2 focus:ring-white/50 peça (accessibility: add custom focus ring)
          "
        >
          {/* Icon from lucide-react */}
          <FileText className="h-5 w-5" strokeWidth={2} />

          {/* Button Text */}
          <span>Smart Contract</span>
        </button>
      </div>
       {/* 弹框 */}
       {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="relative w-11/12 max-w-3xl rounded-lg bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-xl font-bold">Rust Smart Contract</h2>
            <div className="max-h-[70vh] overflow-y-auto"> {/* 添加滚动条 */}

            <pre className="overflow-auto rounded bg-gray-100 p-4 text-sm text-gray-800">
              {`
use anchor_lang::prelude::*;
use anchor_spl::token::{self, Burn, Mint, MintTo, Token, TokenAccount, Transfer};

declare_id!("YOUR_PROGRAM_ID_HERE"); // Replace with your actual program ID after deployment

mod state;
mod contexts;
mod errors;

use state::*;
use contexts::*;
use errors::TempoError;

#[program]
pub mod tempo {
    use super::*;

    // --- Initialization ---
    pub fn initialize(ctx: Context<Initialize>, fee_basis_points: u16, admin: Pubkey) -> Result<()> {
        ctx.accounts.platform_config.admin = admin;
        ctx.accounts.platform_config.fee_basis_points = fee_basis_points;
        ctx.accounts.platform_config.paused = false; // Start unpaused
        ctx.accounts.platform_config.tempo_mint = ctx.accounts.tempo_mint.key();
        ctx.accounts.platform_config.treasury_account = ctx.accounts.treasury_account.key();
        ctx.accounts.platform_config.burn_account = ctx.accounts.burn_account.key();
        ctx.accounts.platform_config.bump = *ctx.bumps.get("platform_config").unwrap();
        Ok(())
    }

    // --- User Profile & Reputation ---
    pub fn create_user_profile(ctx: Context<CreateUserProfile>) -> Result<()> {
        ctx.accounts.user_profile.authority = ctx.accounts.user.key();
        ctx.accounts.user_profile.reputation = 0; // Start with 0 reputation
        ctx.accounts.user_profile.bump = *ctx.bumps.get("user_profile").unwrap();
        // Initialize other fields as needed
        Ok(())
    }

    // --- RDGP (Decentralized Dance Generation Protocol) ---
    // Step 1: User uploads music metadata (off-chain storage link)
    pub fn upload_music_metadata(ctx: Context<UploadMusicMetadata>, ipfs_hash: String, title: String, generation_fee: u64) -> Result<()> {
        require!(!ctx.accounts.platform_config.paused, TempoError::PlatformPaused);
        require!(ipfs_hash.len() > 0 && ipfs_hash.len() <= MAX_IPFS_HASH_LEN, TempoError::InvalidIpfsHash);
        require!(title.len() > 0 && title.len() <= MAX_TITLE_LEN, TempoError::InvalidTitle);

        let metadata = &mut ctx.accounts.music_metadata;
        metadata.creator = ctx.accounts.creator.key();
        metadata.ipfs_hash = ipfs_hash;
        metadata.title = title;
        metadata.generation_status = GenerationStatus::Pending;
        metadata.generation_fee = generation_fee;
        metadata.bump = *ctx.bumps.get("music_metadata").unwrap();

        // (Optional) Collect a small fee for storing metadata
        // transfer_tempo_fee( ... );

        emit!(MusicUploaded {
            metadata_key: ctx.accounts.music_metadata.key(),
            creator: ctx.accounts.creator.key(),
            ipfs_hash: metadata.ipfs_hash.clone(),
            title: metadata.title.clone(),
        });

        Ok(())
    }

    // Step 2: User (or service) requests generation, paying the fee
    pub fn request_dance_generation(ctx: Context<RequestDanceGeneration>) -> Result<()> {
        require!(!ctx.accounts.platform_config.paused, TempoError::PlatformPaused);
        require!(ctx.accounts.music_metadata.creator == ctx.accounts.user.key() || ctx.accounts.user.key() == ctx.accounts.platform_config.admin, TempoError::Unauthorized); // Allow creator or admin
        require!(ctx.accounts.music_metadata.generation_status == GenerationStatus::Pending, TempoError::AlreadyProcessed);

        let fee = ctx.accounts.music_metadata.generation_fee;
        if fee > 0 {
            transfer_tempo_fee(
                ctx.accounts.token_program.to_account_info(),
                ctx.accounts.user_tempo_account.to_account_info(),
                ctx.accounts.treasury_account.to_account_info(),
                ctx.accounts.burn_account.to_account_info(), // Pass burn account
                ctx.accounts.user.to_account_info(),
                ctx.accounts.platform_config.fee_basis_points,
                fee,
                ctx.accounts.tempo_mint.key(),
                Some(ctx.accounts.burn_account.to_account_info()), // Burn account for burn instruction
            )?;
        }

        ctx.accounts.music_metadata.generation_status = GenerationStatus::InProgress;

        emit!(DanceGenerationRequested {
            metadata_key: ctx.accounts.music_metadata.key(),
            requester: ctx.accounts.user.key(),
        });

        Ok(())
    }

    // Step 3: Trusted Oracle/Backend finalizes, provides generated video hash, mints NFT (simplified)
    // In reality, minting NFT would likely involve CPI to Metaplex
    pub fn finalize_generation_and_create_nft_metadata(
        ctx: Context<FinalizeGeneration>,
        video_ipfs_hash: String,
        nft_title: String,
    ) -> Result<()> {
        require!(!ctx.accounts.platform_config.paused, TempoError::PlatformPaused);
        require!(ctx.accounts.authority.key() == ctx.accounts.platform_config.admin, TempoError::Unauthorized); // Only admin/oracle can call this
        require!(ctx.accounts.music_metadata.generation_status == GenerationStatus::InProgress, TempoError::InvalidGenerationState);
        require!(video_ipfs_hash.len() > 0 && video_ipfs_hash.len() <= MAX_IPFS_HASH_LEN, TempoError::InvalidIpfsHash);


        // Update Music Metadata
        ctx.accounts.music_metadata.generation_status = GenerationStatus::Completed;
        ctx.accounts.music_metadata.generated_video_hash = Some(video_ipfs_hash.clone());

        // Create Dance NFT Metadata Account (On-chain record)
        let nft_meta = &mut ctx.accounts.dance_nft_metadata;
        nft_meta.music_metadata = ctx.accounts.music_metadata.key();
        nft_meta.creator = ctx.accounts.music_metadata.creator; // Original music creator
        nft_meta.owner = ctx.accounts.music_metadata.creator; // Initially owned by creator
        nft_meta.video_ipfs_hash = video_ipfs_hash;
        nft_meta.title = nft_title;
        nft_meta.is_listed = false;
        nft_meta.price = 0;
        nft_meta.bump = *ctx.bumps.get("dance_nft_metadata").unwrap();

        // Placeholder: Update Creator Reputation
        // let user_profile = &mut ctx.accounts.creator_profile;
        // user_profile.reputation += 10; // Example increment

        // --- NFT Minting ---
        // This part is highly simplified. A real implementation would:
        // 1. Create a new SPL Mint account for the NFT.
        // 2. Create a Token Account for the owner.
        // 3. Mint 1 token to the owner's token account.
        // 4. Create Metaplex Metadata and Master Edition accounts via CPI.
        // We just store metadata on-chain here.
        // nft_meta.nft_mint = ctx.accounts.nft_mint.key(); // Store the mint if actually minting

        emit!(DanceNF созданный { // Created
            nft_metadata_key: nft_meta.key(),
            music_metadata_key: nft_meta.music_metadata,
            creator: nft_meta.creator,
            video_ipfs_hash: nft_meta.video_ipfs_hash.clone(),
        });

        Ok(())
    }

    // --- NFT Marketplace ---
    pub fn list_nft(ctx: Context<ListNft>, price: u64) -> Result<()> {
        require!(!ctx.accounts.platform_config.paused, TempoError::PlatformPaused);
        require!(ctx.accounts.dance_nft_metadata.owner == ctx.accounts.owner.key(), TempoError::Unauthorized);
        require!(!ctx.accounts.dance_nft_metadata.is_listed, TempoError::AlreadyListed);
        require!(price > 0, TempoError::ZeroPrice);

        let nft_meta = &mut ctx.accounts.dance_nft_metadata;
        nft_meta.is_listed = true;
        nft_meta.price = price;

        // Optional: Transfer NFT to an escrow account (PDA) - More complex
        // Or rely on seller signing the buy transaction

        emit!(NftListed {
            nft_metadata_key: nft_meta.key(),
            seller: nft_meta.owner,
            price: nft_meta.price,
        });

        Ok(())
    }

    pub fn delist_nft(ctx: Context<DelistNft>) -> Result<()> {
        require!(!ctx.accounts.platform_config.paused, TempoError::PlatformPaused);
        require!(ctx.accounts.dance_nft_metadata.owner == ctx.accounts.owner.key(), TempoError::Unauthorized);
        require!(ctx.accounts.dance_nft_metadata.is_listed, TempoError::NotListed);

        let nft_meta = &mut ctx.accounts.dance_nft_metadata;
        nft_meta.is_listed = false;
        nft_meta.price = 0;

        // Optional: If using escrow, transfer NFT back to owner

        emit!(NftDelisted {
            nft_metadata_key: nft_meta.key(),
            owner: nft_meta.owner,
        });

        Ok(())
    }

    pub fn buy_nft(ctx: Context<BuyNft>) -> Result<()> {
        require!(!ctx.accounts.platform_config.paused, TempoError::PlatformPaused);
        require!(ctx.accounts.dance_nft_metadata.is_listed, TempoError::NotListed);
        require!(ctx.accounts.buyer.key() != ctx.accounts.dance_nft_metadata.owner, TempoError::BuyerIsOwner);

        let nft_meta = &mut ctx.accounts.dance_nft_metadata;
        let price = nft_meta.price;
        let seller_key = nft_meta.owner; // Store before changing owner

        // Transfer payment ($Tempo) with fee and potential burn
        transfer_tempo_fee(
            ctx.accounts.token_program.to_account_info(),
            ctx.accounts.buyer_tempo_account.to_account_info(),
            ctx.accounts.seller_tempo_account.to_account_info(), // Seller receives payment (net)
            ctx.accounts.burn_account.to_account_info(),
            ctx.accounts.buyer.to_account_info(), // Buyer is the authority for payment
            ctx.accounts.platform_config.fee_basis_points,
            price,
            ctx.accounts.tempo_mint.key(),
            Some(ctx.accounts.burn_account.to_account_info()), // Burn account
        )?;

        // Update NFT Metadata ownership
        nft_meta.owner = ctx.accounts.buyer.key();
        nft_meta.is_listed = false;
        nft_meta.price = 0;

        // --- Actual NFT Transfer ---
        // Requires CPI to the SPL Token program to transfer the *actual* NFT token.
        // This needs the NFT mint, source token account (seller's or escrow), destination token account (buyer's), and authority signature (seller or escrow PDA).
        // Simplified here by only changing metadata owner.

        emit!(NftSold {
            nft_metadata_key: nft_meta.key(),
            seller: seller_key,
            buyer: nft_meta.owner,
            price: price,
        });

        Ok(())
    }


    // --- Staking ---
    pub fn create_stake_account(ctx: Context<CreateStakeAccount>) -> Result<()> {
        let stake_account = &mut ctx.accounts.stake_account;
        stake_account.owner = ctx.accounts.owner.key();
        stake_account.amount = 0;
        stake_account.start_time = 0;
        stake_account.bump = *ctx.bumps.get("stake_account").unwrap();
        Ok(())
    }

    pub fn stake(ctx: Context<Stake>, amount: u64) -> Result<()> {
        require!(amount > 0, TempoError::ZeroAmount);
        require!(!ctx.accounts.platform_config.paused, TempoError::PlatformPaused);

        // Transfer $Tempo from user to stake vault PDA
        let cpi_accounts = Transfer {
            from: ctx.accounts.user_tempo_account.to_account_info(),
            to: ctx.accounts.stake_vault.to_account_info(),
            authority: ctx.accounts.owner.to_account_info(),
        };
        let cpi_program = ctx.accounts.token_program.to_account_info();
        let cpi_ctx = CpiContext::new(cpi_program, cpi_accounts);
        token::transfer(cpi_ctx, amount)?;

        // Update stake account
        let stake_account = &mut ctx.accounts.stake_account;
        stake_account.amount = stake_account.amount.checked_add(amount).ok_or(TempoError::Overflow)?;
        stake_account.start_time = Clock::get()?.unix_timestamp; // Reset timer on new stake? Or track deposits separately?

        emit!(TokensStaked {
            staker: stake_account.owner,
            amount: amount,
            total_staked: stake_account.amount,
        });

        Ok(())
    }

     pub fn unstake(ctx: Context<Unstake>, amount: u64) -> Result<()> {
        require!(amount > 0, TempoError::ZeroAmount);
        let stake_account = &mut ctx.accounts.stake_account;
        require!(stake_account.amount >= amount, TempoError::InsufficientStake);
        // Add unstaking delay / cooldown logic if needed

        // Calculate rewards (logic depends on reward mechanism - simplified here)
        // let rewards = calculate_rewards(stake_account.amount, stake_account.start_time);
        // Payout rewards if applicable (from a rewards pool - needs another account)

        // Transfer $Tempo from stake vault PDA back to user
        let bump = stake_account.bump; // PDA bump
        let seeds = &[b"stake_vault", ctx.accounts.tempo_mint.key().as_ref(), &[bump]]; // Vault PDA seeds
        let signer = &[&seeds[..]];

        let cpi_accounts = Transfer {
            from: ctx.accounts.stake_vault.to_account_info(),
            to: ctx.accounts.user_tempo_account.to_account_info(),
            authority: ctx.accounts.stake_vault.to_account_info(), // PDA is authority
        };
        let cpi_program = ctx.accounts.token_program.to_account_info();
        let cpi_ctx = CpiContext::new_with_signer(cpi_program, cpi_accounts, signer);
        token::transfer(cpi_ctx, amount)?;

        // Update stake account
        stake_account.amount = stake_account.amount.checked_sub(amount).ok_or(TempoError::Underflow)?;
        if stake_account.amount == 0 {
             stake_account.start_time = 0;
             // Consider closing the stake_account if amount is 0 and no rewards pending
        } else {
             // Update start_time or average entry time if needed for reward calculation
        }


        emit!(TokensUnstaked {
            staker: stake_account.owner,
            amount: amount,
            remaining_staked: stake_account.amount,
        });

        Ok(())
    }


    // --- Tempo Fund (Simplified) ---
    pub fn donate_to_fund(ctx: Context<DonateToFund>, amount: u64) -> Result<()> {
        require!(amount > 0, TempoError::ZeroAmount);

        let cpi_accounts = Transfer {
            from: ctx.accounts.donor_tempo_account.to_account_info(),
            to: ctx.accounts.fund_treasury.to_account_info(), // The DAO / Fund treasury
            authority: ctx.accounts.donor.to_account_info(),
        };
        let cpi_program = ctx.accounts.token_program.to_account_info();
        let cpi_ctx = CpiContext::new(cpi_program, cpi_accounts);
        token::transfer(cpi_ctx, amount)?;

        emit!(FundDonated {
             donor: ctx.accounts.donor.key(),
             amount: amount,
        });

        Ok(())
    }

    // --- Admin Functions ---
    pub fn set_paused(ctx: Context<AdminAction>, paused: bool) -> Result<()> {
        ctx.accounts.platform_config.paused = paused;
        Ok(())
    }

    pub fn update_fee(ctx: Context<AdminAction>, fee_basis_points: u16) -> Result<()> {
        ctx.accounts.platform_config.fee_basis_points = fee_basis_points;
        Ok(())
    }

    pub fn update_admin(ctx: Context<AdminAction>, new_admin: Pubkey) -> Result<()> {
        ctx.accounts.platform_config.admin = new_admin;
        Ok(())
    }
} 
              `}
            </pre>
            </div>
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 rounded-full bg-red-500 px-3 py-1 text-white hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
       <div className="absolute top-4 right-4 z-30">
      <div className="appkit-buttons-container">
        <appkit-button />
        <appkit-network-button />
      </div>
      </div>
      {/* Video Background */}
      <div className="absolute inset-0 h-full w-full bg-black">
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          autoPlay
          loop={false}
          muted
          playsInline
          poster="/placeholder.svg?height=1080&width=1920"
          src={videoUrls[currentVideoIndex]}
        >
          Your browser does not support the video tag.
        </video>
        {/* Dark overlay/mask for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80"></div>

        {/* 添加音量控制按钮 */}
        <button
          onClick={toggleSound}
          className="absolute bottom-4 right-4 z-20 rounded-full bg-black/50 p-2 text-white hover:bg-black/70"
        >
          {isMuted ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M11 5L6 9H2v6h4l5 4V5z"/>
              <line x1="23" y1="9" x2="17" y2="15"/>
              <line x1="17" y1="9" x2="23" y2="15"/>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M11 5L6 9H2v6h4l5 4V5z"/>
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/>
            </svg>
          )}
        </button>
      </div>

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
        <motion.div
          className="mb-6 flex items-center justify-center h-24 w-24"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <svg width="100%" height="100%" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            {/* Gradient definitions */}
            <defs>
              <linearGradient id="logoWaveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style={{ stopColor: "#ff00cc", stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: "#9900ff", stopOpacity: 1 }} />
              </linearGradient>
              <linearGradient id="logoNoteGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style={{ stopColor: "#ff007a", stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: "#cc00ff", stopOpacity: 1 }} />
              </linearGradient>
            </defs>

            {/* Wave paths */}
            <path
              d="M 40 180 Q 80 80 120 180 Q 140 200 160 140"
              stroke="url(#logoWaveGrad)"
              strokeWidth="10"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M 60 160 Q 100 100 140 160"
              stroke="#cc00ff"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              opacity="0.7"
            />

            {/* Music note */}
            <g transform="translate(85, 85)">
              <g>
                {/* Note stem */}
                <path d="M 15 0 L 15 30" stroke="#ff007a" strokeWidth="4" fill="none" strokeLinecap="round" />
                {/* Note head */}
                <circle cx="15" cy="30" r="12" fill="url(#logoNoteGrad)" />
                {/* Flags */}
                <path d="M 15 0 Q 25 5 20 15" stroke="#cc00ff" strokeWidth="3" fill="none" strokeLinecap="round" />
                <path d="M 15 5 Q 23 10 18 20" stroke="#cc00ff" strokeWidth="3" fill="none" strokeLinecap="round" />
              </g>
              {/* Bouncing animation */}
              <animateTransform
                attributeName="transform"
                type="translate"
                values="0 0; 0 -30; 0 0"
                dur="0.8s"
                repeatCount="indefinite"
                additive="sum"
              />
            </g>

            {/* Outer ring */}
            <circle
              cx="100"
              cy="100"
              r="85"
              stroke="url(#logoWaveGrad)"
              strokeWidth="6"
              fill="none"
              strokeDasharray="10,5"
            />
          </svg>
        </motion.div>

        <motion.h1
          className="mb-6 bg-gradient-to-r from-purple-400 via-blue-500 to-purple-600 bg-clip-text text-6xl font-bold tracking-tighter text-transparent sm:text-7xl lg:text-8xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Tempo
        </motion.h1>

        <motion.p
          className="mb-8 max-w-[700px] text-lg text-gray-400 sm:text-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          The Web3 Music-Driven Dance Metaverse. Redefining creative ownership through AI-generated dance, blockchain
          transparency, and decentralized collaboration.
        </motion.p>
      </div>
    </div>
  )
}

