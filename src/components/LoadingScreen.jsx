import React from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingScreen = ({ isVisible, text = '' }) => {
    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-nova-navy"
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{
                            duration: 0.8,
                            ease: "easeOut",
                            repeat: Infinity,
                            repeatType: "reverse"
                        }}
                        className="flex flex-col items-center"
                    >
                        <img
                            src={logoUrl}
                            alt="Nova Wealth"
                            className="w-[240px] md:w-[320px] h-auto object-contain mb-8 filter brightness-0 invert"
                        />
                        {text && (
                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="text-nova-gold font-sans text-sm tracking-widest uppercase font-medium"
                            >
                                {text}
                            </motion.p>
                        )}
                        {/* Loading spinner lines underneath logo */}
                        <div className="mt-8 flex items-center justify-center gap-2">
                            {[0, 1, 2].map((i) => (
                                <motion.div
                                    key={i}
                                    className="w-1.5 h-1.5 rounded-full bg-nova-gold"
                                    animate={{
                                        scale: [1, 1.5, 1],
                                        opacity: [0.5, 1, 0.5],
                                    }}
                                    transition={{
                                        duration: 1,
                                        repeat: Infinity,
                                        delay: i * 0.2,
                                    }}
                                />
                            ))}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

LoadingScreen.propTypes = {
    isVisible: PropTypes.bool.isRequired,
    text: PropTypes.string,
};

export default LoadingScreen;
